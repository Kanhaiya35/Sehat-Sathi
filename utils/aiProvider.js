'use strict';
const { logger } = require('../middleware/logger');

const openAIResponse = async (message, context, systemPrompt) => {
  const OpenAI = require('openai');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const res = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      ...context,
      { role: 'user', content: message },
    ],
    max_tokens: 800,
    temperature: 0.7,
  });
  return res.choices[0].message.content;
};

const geminiResponse = async (message, context, systemPrompt) => {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt,
  });
  const history = context.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  const chat = model.startChat({
    history,
    generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
  });
  const result = await chat.sendMessage(message);
  return result.response.text();
};

const ollamaResponse = async (message, context, systemPrompt) => {
  const axios = require('axios');
  const res = await axios.post(
    `${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/chat`,
    {
      model: process.env.OLLAMA_MODEL || 'llama2',
      messages: [
        { role: 'system', content: systemPrompt },
        ...context,
        { role: 'user', content: message },
      ],
      stream: false,
      options: { temperature: 0.7, num_predict: 800 },
    },
    { timeout: 60000 }
  );
  return res.data.message.content;
};

const FALLBACK_MSG = `I'm temporarily unavailable. For health emergencies:
- Ambulance: 108 | Mother & Child: 102 | Women Helpline: 181
- Child Helpline: 1098 | PM-JAY Helpline: 14555`;

/**
 * Provider factory with automatic fallback chain:
 *   primary → gemini → static message
 */
const getAIResponse = async (message, context, systemPrompt, provider = 'openai') => {
  const providers = {
    openai: openAIResponse,
    gemini: geminiResponse,
    ollama: ollamaResponse,
  };

  // Try primary provider
  try {
    return await providers[provider](message, context, systemPrompt);
  } catch (err) {
    logger.warn(`AI provider [${provider}] failed: ${err.message}`);
  }

  // Fallback to Gemini if not already tried
  if (provider !== 'gemini' && process.env.GEMINI_API_KEY) {
    try {
      logger.info('Falling back to Gemini...');
      return await geminiResponse(message, context, systemPrompt);
    } catch (err) {
      logger.warn(`Gemini fallback failed: ${err.message}`);
    }
  }

  // Fallback to OpenAI if not already tried
  if (provider !== 'openai' && process.env.OPENAI_API_KEY) {
    try {
      logger.info('Falling back to OpenAI...');
      return await openAIResponse(message, context, systemPrompt);
    } catch (err) {
      logger.warn(`OpenAI fallback failed: ${err.message}`);
    }
  }

  return FALLBACK_MSG;
};

module.exports = { getAIResponse };