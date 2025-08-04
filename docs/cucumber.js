module.exports = {
  default: {
    requireModule: ['@babel/register'],
    require: ['features/step_definitions/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true
  }
}; 