<template>
    <div class="table-container">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="input-group">
                <input type="text" v-model="searchText" placeholder="Chercher..." class="form-control search-input">
            </div>
            <button @click="fetchData" class="btn refresh-btn ml-2">Actualiser</button>
        </div>
        <table class="table table-hover">
            <thead class="table-header">
                <tr>
                    <th scope="col">Date d'ajout</th>
                    <th scope="col">Commercial</th>
                    <th scope="col">Raison Sociale</th>
                    <th scope="col">Compteur</th>
                    <th scope="col">Pièce jointe</th>
                    <th scope="col">Début de Devis</th>
                    <th scope="col">Statut</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in filteredData" :key="row.id">
                    <td>{{ $filters.formatDate(row.created_at) }}</td>
                    <td>{{ row.manager_last_name }} {{ row.manager_first_name }}</td>
                    <td>{{ row.siret }}</td>
                    <td> 123 </td>
                    <td></td>
                    <td> debutDevis </td>
                    <td> statut </td>
                </tr>
                <!-- //TODO: add no data -->
            </tbody>
        </table>
        <pagination :page-size="pageSize" :current-page="currentPage" :total-pages-count="totalPagesCount" :total-count="totalCount"
            @page-change="changePage" @size-change="changeSize" />
    </div>
</template>

<script>
import apiClient from '@/services/api';
import Pagination from '@/components/shared/Pagination'

export default {
    components: {
        Pagination
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.fetchData();
        });
    },
    beforeRouteLeave(to, from, next) {
        this.cleanupSearchTimer();
        next();
    },
    data() {
        return {
            searchText: '',
            searchTimer: null,
            currentPage: 1,
            pageSize: 10,
            totalPagesCount: 1,
            totalCount: 0,
            filteredData: [],
        };
    },
    beforeUnmount() {
        this.cleanupSearchTimer();
    },
    mounted() {
        this.setupSearchTimer();
    },
    methods: {
        fetchData() {
            const searchParam = this.searchText.trim();
            apiClient.get(`/core/company/?page=${this.currentPage}&size=${this.pageSize}&search=${searchParam}`)
                .then(response => {
                    console.log(response);
                    this.totalCount = response.data.count;
                    this.totalPagesCount = Math.ceil(response.data.count / this.pageSize);
                    this.filteredData = response.data.results;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        changePage(page) {
            this.currentPage = page;
            this.fetchData()
        },
        changeSize(size) {
            this.currentPage = 1;
            this.pageSize = size;
            this.fetchData()
        },
        setupSearchTimer() {
            this.$watch('searchText', this.handleSearchWithDelay);
        },
        handleSearchWithDelay() {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }
            this.searchTimer = setTimeout(() => {
                this.fetchData();
            }, 1000);
        },
        cleanupSearchTimer() {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
                this.searchTimer = null; 
            }
        },
    },
};
</script>

<style scoped>
.search-input {
    max-width: 10rem;
}

.refresh-btn {
    background-color: #66badb;
    color: #fff;
}

.refresh-btn:hover {
    background-color: #14a2da;
    color: #fff;
}

.table-header th {
    background-color: #66badb;
    color: #fff;
}
</style>