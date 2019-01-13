let api = "http://192.168.1.34:7000/api"

export function loginCustomer(){
    let url = api + '/customer/auth'
    return url;
}

export function cekUser(){
    let url = api + '/customer/cu'
    return url;
}

export function registerCustomer(){
    let url = api + '/customeracc'
    return url;
}

export function getAccount(){
    let url = api + '/account/accounts'
    return url;
}

export function verifPin(){
    let url = api + '/account/verif'
    return url;
}

export function postTopUp(){
    let url = api + '/topup'
    return url;
}

export function postTransfer(){
    let url = api + '/transaction'
    return url;
}

export function postWithdraw(){
    let url = api + '/withdraw/'
    return url;
}

export function getReception(){
    let url = api + '/inbox/inboxs'
    return url;
}

export function getTopUp(){
    let url = api + '/topup/topups'
    return url;
}

export function getTransfer(){
    let url = api + '/transaction/transactions'
    return url;
}

export function getWithdraw(){
    let url = api + '/withdraw/withdraws'
    return url;
}