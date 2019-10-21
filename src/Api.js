const apiUrl = 'https://customerrest.herokuapp.com';

export const getCustomers = async () => {
    const response = await fetch(`${apiUrl}/api/customers`);
    const data = await response.json();
    data.content.map((obj, i) => {
        if(obj.firstname == null || obj.lastname == null) return null;
        return obj.fullname = obj.firstname + ' ' + obj.lastname;
    });
    return data;
}

export const getTrainings = async () => {
    const response = await fetch(`${apiUrl}/gettrainings`);
    const data = await response.json();
    data.map((obj, i) => {
        if (obj.customer == null) return null;
        return obj.customer.fullname = obj.customer.firstname + ' ' + obj.customer.lastname;
    });
    return data;
}

export const saveCustomer = async (customer) => {
    let isOld = customer.hasOwnProperty('links') && customer.links.constructor === Array;
    const response = await fetch(isOld ? customer.links[0].href : `${apiUrl}/api/customers`, {
        method: isOld ? 'PUT' : 'POST',
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export const saveTraining = async (training) => {
    let copyTraining = Object.assign({}, training);
    copyTraining.customer = 'https://localhost:8080/api/customers/' + copyTraining.customer;
    const response = await fetch(`${apiUrl}/api/trainings`, {
        method: 'POST',
        body: JSON.stringify(copyTraining),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

export const deleteCustomer = async (customer) => {
    const response = await fetch(customer.links[0].href, {method: 'DELETE'});
    return response;
}

export const deleteTraining = async (training) => {
    const response = await fetch(`${apiUrl}/api/trainings/${training.id}`, {method:'DELETE'});
    return response;
}
