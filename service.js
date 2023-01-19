const yahooFinance = require('yahoo-finance2').default;

async function fetchData(req, res){
    try {
        const body = req.params
        if (body && body.hasOwnProperty('symbol')) {
            const symbol = body.symbol
            const { regularMarketPrice , currency,  quoteType} = await yahooFinance.quote(symbol);
            console.log({ regularMarketPrice , currency,  quoteType})
            const data = {
                ...{ regularMarketPrice , currency,  quoteType},
                symbol: symbol,
            }
            return {status: 'SUCCESS', data: data}
        } else {
            res.status(400).end()
        }
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
}

module.exports = {
    fetchData
}