import { LightningElement, track } from 'lwc';
import fetchPropertyData from '@salesforce/apex/PropertySearchService.fetchPropertyData';

export default class PropertySearch extends LightningElement {
    @track street = '';
    @track city = '';
    @track state = '';
    @track zip = '';
    @track query = '';
    @track properties = [];

    columns = [
        { label: 'Year Built', fieldName: 'yearBuilt', type: 'number' },
        { label: 'Living Area (SqFt)', fieldName: 'livingAreaSquareFeet', type: 'number' },
        { label: 'Building Count', fieldName: 'buildingCount', type: 'number' },
        { label: 'Room Count', fieldName: 'roomCount', type: 'number' },
        { label: 'Bathroom Count', fieldName: 'bathroomCount', type: 'number' },
        { label: 'Garage Parking Spaces', fieldName: 'garageParkingSpaceCount', type: 'number' },
        { label: 'Stories', fieldName: 'storyCount', type: 'number' },
        { label: 'Features', fieldName: 'features' },
        { label: 'Owner(s)', fieldName: 'ownerNames' }
    ];

    handleInput(event) {
        this[event.target.label.toLowerCase().replace(/\s/g, '')] = event.target.value;
    }

    async handleSearch() {
        const payload = {
            searchCriteria: {
                query: this.query,
                compAddress: {
                    street: this.street,
                    city: this.city,
                    state: this.state,
                    zip: this.zip
                }
            },
            options: {
                useYearBuilt: true,
                skip: 0,
                take: 10
            }
        };

        try {
            const apiKey = 'API Token Bearer';
            const result = await fetchPropertyData({ queryPayload: JSON.stringify(payload), apiKey });
            const parsed = JSON.parse(result);
            const rawProps = parsed?.results?.properties || [];
            this.properties = rawProps.map((prop) => ({
                _id: prop._id,
                yearBuilt: prop.building?.yearBuilt,
                livingAreaSquareFeet: prop.building?.livingAreaSquareFeet,
                buildingCount: prop.building?.buildingCount,
                roomCount: prop.building?.roomCount,
                bathroomCount: prop.building?.bathroomCount,
                garageParkingSpaceCount: prop.building?.garageParkingSpaceCount,
                storyCount: prop.building?.storyCount,
                features: prop.building?.features?.join(', '),
                ownerNames: prop.owner?.fullName
            }));
        } catch (err) {
            console.error('API fetch error:', err);
        }
    }
}
