import { LightningElement, api } from 'lwc';

export default class OpportunityComponent extends LightningElement {
    @api data;

    handleChange(event) {
        const field = event.target.dataset.id;
        const value = event.target.value;

        this.dispatchEvent(new CustomEvent('childchange', {
            detail: {
                section: 'opportunity',
                field,
                value
            },
            bubbles: true,
            composed: true
        }));
    }

    @api updateData(newData) {
        this.data = JSON.parse(JSON.stringify(newData));
    }
}
