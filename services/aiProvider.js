'use strict';

const { logger } = require('../middleware/logger');

/* ================= HELPERS ================= */

const safeExecute = async (fn, name) => {
  try {
    return await fn();
  } catch (err) {
    logger.warn(`AI provider [${name}] failed: ${err.message}`);
    return null;
  }
};

/* ================= OPENAI ================= */

const openAIResponse = async (message, context, systemPrompt) => {
  const OpenAI = require('openai');

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 20000 // 🔥 prevent hanging
  });

  const res = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      ...context,
      { role: 'user', content: message }
    ],
    max_tokens: 800,
    temperature: 0.7
  });

  return res?.choices?.[0]?.message?.content || '';
};

/* ================= GEMINI ================= */

const geminiResponse = async (message, context, systemPrompt) => {
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt
  });

  const history = context.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 800,
      temperature: 0.7
    }
  });

  const result = await chat.sendMessage(message);

  return result?.response?.text() || '';
};

/* ================= OLLAMA ================= */

const ollamaResponse = async (message, context, systemPrompt) => {
  const axios = require('axios');

  const res = await axios.post(
    `${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/chat`,
    {
      model: process.env.OLLAMA_MODEL || 'llama2',
      messages: [
        { role: 'system', content: systemPrompt },
        ...context,
        { role: 'user', content: message }
      ],
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 800
      }
    },
    {
      timeout: 20000 // 🔥 prevent long wait
    }
  );

  return res?.data?.message?.content || '';
};

/* ================= FALLBACK MESSAGE ================= */

const FALLBACK_MSG = `I'm temporarily unavailable. For health emergencies:
- Ambulance: 108 | Mother & Child: 102 | Women Helpline: 181
- Child Helpline: 1098 | PM-JAY Helpline: 14555`;

/* ================= MAIN FUNCTION ================= */

const getAIResponse = async (
  message,
  context,
  systemPrompt,
  provider = 'openai'
) => {

  const providers = {
    openai: () => openAIResponse(message, context, systemPrompt),
    gemini: () => geminiResponse(message, context, systemPrompt),
    ollama: () => ollamaResponse(message, context, systemPrompt)
  };

  // 🔥 ensure valid provider
  if (!providers[provider]) {
    logger.warn(`Invalid provider: ${provider}, defaulting to openai`);
    provider = 'openai';
  }

  /* ===== PRIMARY PROVIDER ===== */
  const primaryResponse = await safeExecute(providers[provider], provider);
  if (primaryResponse) return primaryResponse;

  /* ===== FALLBACK: GEMINI ===== */
  if (provider !== 'gemini' && process.env.GEMINI_API_KEY) {
    logger.info('Falling back to Gemini...');
    const gemini = await safeExecute(
      () => geminiResponse(message, context, systemPrompt),
      'gemini'
    );
    if (gemini) return gemini;
  }

  /* ===== FALLBACK: OPENAI ===== */
  if (provider !== 'openai' && process.env.OPENAI_API_KEY) {
    logger.info('Falling back to OpenAI...');
    const openai = await safeExecute(
      () => openAIResponse(message, context, systemPrompt),
      'openai'
    );
    if (openai) return openai;
  }

  /* ===== FINAL FALLBACK ===== */
  logger.error('All AI providers failed. Returning static fallback.');

  return FALLBACK_MSG;
};

module.exports = { getAIResponse };