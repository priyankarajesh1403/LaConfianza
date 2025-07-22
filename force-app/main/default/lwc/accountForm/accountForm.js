import { LightningElement, track } from 'lwc';
import saveRecords from '@salesforce/apex/AccountFormController.saveRecords';

export default class AccountForm extends LightningElement {
    @track formData = {
        account: { Name: '', Phone: '', Email__c: '', Industry__c: '', Amount__c: '' },
        contact: { LastName: '', Email: '', Phone: '', Industry__c: '', Amount__c: '' },
        opportunity: { Name: '', Industry__c: '', Amount: '', Email__c: '', Phone__c: '', StageName: '', CloseDate: ''}
    };

    handleChange(event) {
        const [section, field] = event.target.dataset.id.split('.');
        this.formData[section][field] = event.target.value;

        if (field === 'Email__c' || field === 'Phone' || field === 'Name' || field === 'Industry__c' || field === 'Amount__c') {
            const contactField = field === 'Email__c' ? 'Email' : (field === 'Phone' ? 'Phone' : (field === 'Name' ? 'LastName': (field === 'Industry__c' ? 'Industry__c' : 'Amount__c')));
            const oppField = field === 'Phone' ? 'Phone__c' : (field === 'Amount__c' ? 'Amount': field);
            this.formData.contact[contactField] = event.target.value;
            this.formData.opportunity[oppField] = event.target.value;
        }

        this.refreshChildren();
    }

    handleChildChange(event) {
        const { section, field, value } = event.detail;
        this.formData[section][field] = value;

        if ((field === 'Email' || field === 'Phone' || field === 'LastName' || field === 'Industry__c' || field === 'Amount__c') && section === 'contact') {
            const accountField = field === 'Email' ? 'Email__c' : (field === 'Phone' ? 'Phone' : (field === 'LastName' ? 'Name': (field === 'Industry__c' ? 'Industry__c' : 'Amount__c')));
            const oppField = field === 'Email' ? 'Email__c' : (field === 'Phone' ? 'Phone__c' : (field === 'LastName' ? 'Name' : (field === 'Industry__c' ? 'Industry__c' : 'Amount')));
            this.formData.account[accountField] = value;
            this.formData.opportunity[oppField] = value;
        }
        if ((field === 'Email__c' || field === 'Phone__c' || field === 'Name' || field === 'Industry__c' || field === 'Amount') && section === 'opportunity') {
            const accountField = field === 'Email__c' ? 'Email__c' : (field === 'Phone__c' ? 'Phone' : (field === 'Name' ? 'Name': (field === 'Industry__c' ? 'Industry__c' : 'Amount__c')));
            const conField = field === 'Email__c' ? 'Email' : (field === 'Phone__c' ? 'Phone' : (field === 'Name' ? 'LastName' : (field === 'Industry__c' ? 'Industry__c' : 'Amount__c')));
            this.formData.account[accountField] = value;
            this.formData.contact[conField] = value;
        }

        this.refreshChildren();
    }

    refreshChildren() {
        this.template.querySelectorAll('c-contact-component').forEach(c => c.updateData(this.formData));
        this.template.querySelectorAll('c-opportunity-component').forEach(c => c.updateData(this.formData));
    }

    async handleSave() {
        try {
            const wrapperData = {
                    accName: this.formData.account.Name,
                    accEmail: this.formData.account.Email__c,
                    accPhone: this.formData.account.Phone,
                    accIndustry: this.formData.account.Industry__c,
                    accAmount: this.formData.account.Amount__c,

                    conLastName: this.formData.contact.LastName,
                    conEmail: this.formData.contact.Email,
                    conPhone: this.formData.contact.Phone,
                    conIndustry: this.formData.contact.Industry__c,
                    conAmount: this.formData.contact.Amount__c,

                    oppName: this.formData.opportunity.Name,
                    oppStageName: this.formData.opportunity.StageName,
                    oppCloseDate: this.formData.opportunity.CloseDate,
                    oppAmount: this.formData.opportunity.Amount,
                    oppEmail: this.formData.opportunity.Email__c,
                    oppPhone: this.formData.opportunity.Phone__c,
                    oppIndustry: this.formData.opportunity.Industry__c
                };
            
            await saveRecords({ formData: wrapperData });
            
            this.formData = {
                account: { Name: '', Phone: '', Email__c: '', Industry__c: '', Amount__c: '' },
                contact: { LastName: '', Email: '', Phone: '', Industry__c: '', Amount__c: '' },
                opportunity: { Name: '', Industry__c: '', Amount: '', Email__c: '', Phone__c: '', StageName: '', CloseDate: ''}
            };
            this.refreshChildren();
        } catch (err) {
            console.error(err);
            alert('Error saving records');
        }
    }
}
