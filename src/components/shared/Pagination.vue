<template>
    <div class="pagination-container">
        <div class="pagination-select">
            éléments affichés
            <select v-model="SelectedPageSize" @change="changeSize($event.target.value)">
                <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
            </select>
            {{ currentPage }} - {{ (currentPage + pageSize) < totalCount ? currentPage + pageSize : totalCount }} sur {{ totalCount }}
        </div>

        <ul class="pagination pagination-links">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="page in totalPagesCount" :key="page" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPagesCount }">
                <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: Number,
        totalPagesCount: Number,
        pageSize: Number,
        totalCount: Number
    },
    data() {
        return {
            SelectedPageSize: this.pageSize,
            pageSizes: [5, 10, 20, 50],
        };
    },
    methods: {
        changePage(page) {
            this.$emit('page-change', page);
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit('page-change', this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPagesCount) {
                this.$emit('page-change', this.currentPage + 1);
            }
        },
        changeSize(size) {
            this.$emit('size-change', size);
        },
    }
};
</script>

<style scoped>
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination-links {
    margin-left: auto;
}

.pagination-select {
    list-style-type: none;
    display: flex;
    gap: 5px;
}
</style>