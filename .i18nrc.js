const { defineConfig } = require('@lobehub/i18n-cli');

module.exports = defineConfig({
  entry: 'locales/zh-CN',
  entryLocale: 'zh-CN',
  output: 'locales',
  outputLocales: [
    // 'ar',
    // 'bg-BG',
    'zh-TW',
    'en-US',
    'ru-RU',
    'ja-JP',
    'ko-KR',
    // 'fr-FR',
    // 'tr-TR',
    // 'es-ES',
    // 'pt-BR',
    'de-DE',
    // 'it-IT',
    // 'nl-NL',
    // 'pl-PL',
    // 'vi-VN',
  ],
  // reference: '用户输入的内容都是需要翻译的内容，将完整的JSON内容作为回答返回给用户，不需要使用代码块包裹。请确保翻译后的内容与原文格式完全一致，不要添加任何其他解释性的提示或说明，如果内容包含有标点符号，请将内容中的标点符号转为转换语言正确使用的标点符号。',
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
  splitToken: 2048,
  experimental: {
    jsonMode: true,
  },
});
