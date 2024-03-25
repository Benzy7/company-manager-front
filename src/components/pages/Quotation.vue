<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light step-nav">
            <div class="container-fluid">
                <span class="navbar-brand">Rentrer une opportunité</span>
            </div>
        </nav>
        <div class="row justify-content-center align-items-start">
            <div class="stepper">
                <div v-for="(step, index) in steps" :key="index" :class="{ active: currentStep === index + 1 }"
                    class="step">
                    <div class="mt-2">
                        <span class="step-number">{{ index + 1 }}</span>
                        {{ step.label }}
                    </div>
                </div>
            </div>

            <!-- Step contents -->
            <div v-show="currentStep === 1" class="step-content">
                <div class="input-group mb-3">
                    <input type="text" v-model="companySearchQuery" class="form-control form-control-sm"
                        placeholder="SIRET">
                    <button @click="searchCompany" class="btn step-btn btn-sm" type="button">Rechercher</button>
                </div>
                <div v-if="companySearchResults.length > 0" class="card-deck">
                    <div v-for="(result, index) in companySearchResults" :key="index" class="card clickable"
                        @click="valdiateFirstStep(result)">
                        <div class="card-body">
                            <h5 class="card-title">{{ result.name }}</h5>
                            <p class="card-text">{{ result.siret }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>Pas de données.</p>
                </div>
            </div>

            <div v-show="currentStep === 2" class="step-content">
                <form>
                    <div class="row">
                        <div class="col label-align">
                            <label for="companyName">Nom Entreprise:</label>
                            <input type="text" id="companyName" v-model="company.name" class="form-control"
                                placeholder="Saisir le nom de l'entreprise">
                        </div>
                        <div class="col label-align">
                            <label for="companyPostalCode">Code postal Entreprise:</label>
                            <input type="number" id="companyPostalCode" v-model="company.postal_code"
                                class="form-control" placeholder="Saisir le code postal de l'entreprise">
                        </div>
                    </div>
                    <div class="form-group label-align">
                        <label for="companySiret">Siret Entreprise:</label>
                        <input type="email" id="companySiret" v-model="company.siret" class="form-control"
                            placeholder="Saisir le siret de l'entreprise">
                    </div>
                    <div class="form-group label-align">
                        <label for="companyReason">Raison Entreprise:</label>
                        <input type="text" id="companyReason" v-model="company.reason" class="form-control"
                            placeholder="Saisir la raison de l'entreprise">
                    </div>
                    <br>
                    <div class="row">
                        <div class="col label-align">
                            <label for="managerFirstName">Prénom de responsable:</label>
                            <input type="text" id="managerFirstName" v-model="manager.first_name" class="form-control"
                                placeholder="Saisir le nom du responsable">
                        </div>
                        <div class="col label-align">
                            <label for="managerLastName">Nom de responsable:</label>
                            <input type="text" id="managerLastName" v-model="manager.last_name" class="form-control"
                                placeholder="Saisir le nom de famille du responsable">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col label-align">
                            <label for="managerEmail">Email de responsable:</label>
                            <input type="email" id="managerEmail" v-model="manager.email" class="form-control"
                                placeholder="Saisir l'email du responsable">
                        </div>
                        <div class="col label-align">
                            <label for="managerPhone">Numéro de téléphone du responsable:</label>
                            <input type="text" id="managerPhone" v-model="manager.phone_number" class="form-control"
                                placeholder="saisir le numéro de téléphone du responsable">
                        </div>
                    </div>
                </form>
            </div>

            <div v-show="currentStep === 3" class="step-content">
                <form @submit.prevent="addPoints">
                    <div v-for="(object, index) in points" :key="index" class="form-group">
                        <div class="row">
                            <label class="mt-3">Point {{ index + 1 }}:</label>
                            <div class="col">
                                <select v-model="object.pdl_type" class="form-control">
                                    <option value="ELEC">ELEC</option>
                                    <option value="GAZ">GAZ</option>
                                </select>
                            </div>
                            <div class="col">
                                <input type="text" v-model="object.pdl" class="form-control">
                            </div>
                        </div>
                    </div>
                    <button type="button" @click="addObjectField" class="btn btn-secondary mt-4">Add Point</button>
                </form>
            </div>


            <div v-show="currentStep === 4" class="step-content">
                <input type="file" @change="uploadFiles" multiple class="form-control-file">
            </div>
        </div>

        <div class="row justify-content-between mt-4">
            <div class="col-auto">
                <button @click="prevStep" class="btn step-btn" :disabled="currentStep === 1">Précédent</button>
            </div>
            <div class="col-auto">
                <button @click="nextStep" class="btn step-btn" :disabled="currentStep === steps.length">Suivant</button>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
    data() {
        return {
            currentStep: 1,
            steps: [
                { label: 'Recherche Enterprise' },
                { label: 'Information Enterprise' },
                { label: 'Ajouter Point(s)' },
                { label: 'Ajouter Fichier(s)' }
            ],
            companySearchQuery: '',
            companySearchResults: [],
            isNewCompany: false,
            company: {
                name: "",
                reason: "",
                siret: "",
                postal_code: null
            },
            manager: {
                first_name: "",
                last_name: "",
                phone_number: "",
                email: "",
                company: ""
            },
            points: [],
            uploadedFiles: [],
        };
    },
    methods: {
        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },
        nextStep() {
            if (this.currentStep == 2) {
                this.addCompanyQuotation();
            } else if (this.currentStep == 3) {
                this.addPoints()
            } else {
                if (this.currentStep < this.steps.length) {
                    this.currentStep++;
                }
            }
        },
        searchCompany() {
            apiClient.get(`/core/companies/lite/?siret=${this.companySearchQuery}`)
                .then(response => {
                    this.companySearchResults = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.companySearchResults = [];
                });
        },
        valdiateFirstStep(company = null) {
            if (company) {
                apiClient.get(`/core/company/${company.id}/`)
                    .then(response => {
                        this.manager = response.data.manager;
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
                this.isNewCompany = true;
                this.company = company;
            }
            this.nextStep();
        },
        addCompanyQuotation() {
            apiClient.post(`/core/add-quotation/`, { "company": this.company, "manager": this.manager })
                .then(response => {
                    console.log(response);
                    this.company = response.data.company;
                    this.currentStep++;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        addObjectField() {
            this.points.push({
                pdl: '',
                pdl_type: 'ELEC',
                company: this.company.id
            });
        },
        addPoints() {
            console.log('points:', this.points);
            //TODO: validation
            apiClient.post(`/core/add-points/`, this.points)
                .then(response => {
                    console.log(response);
                    this.currentStep++;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        uploadFiles(event) {
            //TODO
            this.uploadedFiles = Array.from(event.target.files);
            console.log('Uploaded Files:', this.uploadedFiles);
        },
    },
};
</script>

<style scoped>
.step-nav {
    color: #fff;
    background-color: #66badb !important;
    display: flex;
    flex-direction: column;
}

.step-nav span {
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: #66badb;
    color: white;
    text-align: center;
    line-height: 30px;
}

.step-nav span.active {
    background-color: #4caf50;
}

.stepper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.step {
    text-align: center;
}

.step button {
    width: 100%;
    margin-top: 10px;
}

.step-number {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #66badb;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
}

.step-content {
    margin-top: 20px;
}

.step-btn {
    background-color: #66badb;
    color: #fff;
}

.step-btn:hover {
    background-color: #11a0d8;
    color: #fff;
}

.card.clickable {
    cursor: pointer;
}

.card.clickable:hover {
    background-color: #f0f0f0;
    /* Change background color on hover */
}

.label-align {
    text-align: left;
}
</style>