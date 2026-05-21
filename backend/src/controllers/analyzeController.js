import {
  analyzeMessage,
  analyzeUrl,
} from '../services/threatAnalyzerService.js';

export async function postAnalyzeMessage(req, res, next) {
  try {
    const { content } = req.validated;
    const data = await analyzeMessage(content);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function postAnalyzeUrl(req, res, next) {
  try {
    const { url } = req.validated;
    const data = await analyzeUrl(url);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
