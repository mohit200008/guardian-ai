export function errorHandler(err, _req, res, _next) {
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal server error';

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    error: {
      message,
      code: err.code ?? 'INTERNAL_ERROR',
      ...(err.details && { details: err.details }),
    },
  });
}

export class AppError extends Error {
  constructor(message, status = 500, code = 'APP_ERROR', details = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
