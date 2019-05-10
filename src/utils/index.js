import states from './data/states';
import countries from './data/countries';
import omit from 'lodash/omit';

export const createActionType = (type, entity = 'App') => ({
    START: `@@[${entity}] ${type}`,
    SUCCESS: `@@[${entity}] ${type}_SUCCESS`,
    ERROR: `@@[${entity}] ${type}_ERROR`,
    END: `@@[${entity}] ${type}_END`
});

export const createActionString = (type, entity = 'App') => `[${entity}] ${type}`;

export const modifyNavigation = (accountName, nav) => {
    const navigation = {...nav};
    if (!navigation) {
        return;
    }
    const {items} = {...navigation};
    const prefix = `/${accountName.toLowerCase()}`;
    items.forEach(function appendString(item) {
        if (item.url && !item.url.startsWith(prefix)) {
            item.url = prefix + item.url;
        }
        item.children && Array.isArray(item.children) && item.children.forEach(appendString);
    });
    return {items};
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatContact = (data) => {
    console.log('location : ', data);
    const {location} = data;
    const [no, ...rest] = location.street.split(' ');
    return {
        location: {
            no,
            street: rest.join(' '),
            state: states.find((state) => state.value.toLowerCase() === location.state.toLowerCase()),
            country: countries.find((country) => country.value === location.country),
            ...omit(location, 'street', 'state', 'country'),
        }
    };
};


