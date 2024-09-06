// Function to save data to local storage with key-value pair
class Storage {

    set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            console.log(`Data saved successfully with key: ${key}`);
        } catch (error) {
            console.error(`Error saving data with key ${key}:`, error);
        }
    }

    // Function to retrieve data from local storage using key
    get(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                console.warn(`No data found for key: ${key}`);
                return null;
            }
            let value;
            try {
                value = JSON.parse(serializedValue);
            } catch (error) {
                // If JSON.parse fails, try to deserialize using other methods
                try {
                    value = this.deserialize(serializedValue);
                } catch (error) {
                    console.error(`Error deserializing data with key ${key}:`, error);
                    return null;
                }
            }
            console.log(`Data retrieved successfully with key: ${key}`);
            return value;
        } catch (error) {
            console.error(`Error retrieving data with key ${key}:`, error);
            return null;
        }
    }
    deserialize(serializedValue) {
        // You can add more deserialization methods as needed
        if (typeof serializedValue === 'string') {
            // Try to deserialize as a string
            return serializedValue;
        } else if (serializedValue.startsWith('[') && serializedValue.endsWith(']')) {
            // Try to deserialize as an array
            return serializedValue.slice(1, -1).split(',');
        } else if (serializedValue.startsWith('{') && serializedValue.endsWith('}')) {
            // Try to deserialize as an object
            const obj = {};
            serializedValue.slice(1, -1).split(',').forEach((pair) => {
                const [key, value] = pair.split(':');
                obj[key.trim()] = value.trim();
            });
            return obj;
        } else {
            // If all else fails, return the original serialized value
            return serializedValue;
        }
    }

    // Function to save token to local storage using the generic set function
    set token(token) {
        this.set('token', token);
    }

    get token() {
        return this.get('token');
    }

    set user(userInfo) {
        this.set('USER', userInfo);
    }

    get user() {
        return this.get('USER');
    }

}
export const storageHelper = new Storage();