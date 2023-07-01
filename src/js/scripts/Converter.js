export default class CurrencyConverter{
    static async returnExchange(amount, from, to) {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${amount}/${from}/${to}/`);
            const jsonifiedResponse = await response.json();
            if (!response.ok) {
                const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
                throw new Error(errorMessage);
            } 
            return jsonifiedResponse;
        } catch(error) {  
            return error;
        }
    }
}