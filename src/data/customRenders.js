import numeral from "numeral";

function numberCellRenderer (params) {
    if (params.value === 0) {
        return "--";
    } else {
        return numeral(params.value).format("0,0.00");
    }
}

function percentCellRenderer (params) {
    if (params.value === 0) {
        return "--";
    } else {
        return numeral(params.value).format("0 %");
    }
}

export default {
    numberCellRenderer,
    percentCellRenderer
}