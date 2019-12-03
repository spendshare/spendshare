export default {
  mongoPath: process.env.IS_PRODUCTION
    ? 'mongodb://mongo:27017/spendshare'
    : 'mongodb://localhost:27017/spendshare',
  gurobiPath: process.env.GUROBI_PATH || 'http://localhost:4000',
}
