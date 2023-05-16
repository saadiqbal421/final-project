export const currencyFormatter = (data) => {
    return (data.amount * 100/100).toLocaleString(data.curreny,{
       style: "currency",
       currency: data.currency, 
    });
};
export const stripeCurrencyFormatter = (data) => {
    return (data.amount / 100).toLocaleString(data.curreny,{
       style: "currency",
       currency: data.currency, 
    });
};
