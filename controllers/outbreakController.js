const axios = require("axios");
const cheerio = require("cheerio");
const { logger } = require("../middleware/logger");

/* ================= CACHE ================= */

let cache = {
  data: null,
  timestamp: 0
};

const CACHE_TTL = 60 * 1000; // 60 sec

/* ================= GET OUTBREAK NEWS ================= */

exports.getOutbreakNews = async (req, res, next) => {
  try {

    // ✅ Serve from cache
    if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
      return res.json({
        success: true,
        source: "cache",
        alerts: cache.data
      });
    }

    const url =
      "https://news.google.com/rss/search?q=disease+outbreak+when:7d&hl=en-IN&gl=IN&ceid=IN:en";

    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(response.data, { xmlMode: true });

    const alerts = [];

    $("item").slice(0, 6).each((i, el) => {
      alerts.push({
        title: $(el).find("title").text().trim(),
        link: $(el).find("link").text().trim(),
        date: $(el).find("pubDate").text().trim()
      });
    });

    // ✅ update cache
    cache = {
      data: alerts,
      timestamp: Date.now()
    };

    logger.info("Fetched outbreak news from Google RSS");

    res.json({
      success: true,
      source: "live",
      count: alerts.length,
      alerts
    });

  } catch (err) {

    logger.error({
      message: "Outbreak RSS fetch failed",
      error: err.message
    });

    res.status(500).json({
      success: false,
      message: "Unable to fetch outbreak alerts"
    });

  }
};