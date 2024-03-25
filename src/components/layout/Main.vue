<template>
    <input type="checkbox" id="check">
    <label for="check">
        <font-awesome-icon id="btn" :icon="['fas', 'bars']" />
        <font-awesome-icon id="cancel" :icon="['fas', 'times']" />
    </label>
    <div class="sidebar">
        <header>Dashboard</header>
        <div class="nav-item" v-for="(route, index) in dashboardRoutes" :key="route.path"
            :class="{ 'active': index === activeIndex }">
            <router-link :to="route.path" class="nav-link" @click="setActive(index)">
                <font-awesome-icon :icon="['fas', 'building']" />
                <span class="nav-text">{{ route.name }}</span>
            </router-link>
        </div>
        <div class="sidebar-footer" @click="logoutUser">
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            <span>Déconnexion</span>
        </div>
    </div>
    <div class="main-content">
        <router-view />
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            activeIndex: 0,
            dashboardRoutes: [
                { path: '/dashboard/company', name: 'Sociétés' },
                { path: '/dashboard/quotation', name: 'Cotation' },
            ],
        };
    },
    methods: {
        ...mapActions('auth', ['logout']),
        logoutUser() {
            this.logout();
            this.$router.push('/login');
        },
        setActive(i) {
            this.activeIndex = i;
        }
    },
};
</script>

<style scoped>
.sidebar {
    z-index: 1;
    position: fixed;
    width: 240px;
    left: -240px;
    height: 100%;
    background-color: #66badb;
    transition: all .5s ease;
}

.sidebar header {
    font-size: 28px;
    color: #fff;
    line-height: 70px;
    text-align: center;
    background-color: #66badb;
    user-select: none;
    font-family: 'Lato', sans-serif;
}

.sidebar .nav-item {
    display: block;
    height: 65px;
    width: 100%;
    color: #000;
    line-height: 65px;
    padding-left: 30px;
    box-sizing: border-box;
    border-left: 5px solid transparent;
    font-family: 'Lato', sans-serif;
    transition: all .5s ease;
}

.nav-item.active,
.nav-item:hover {
    background-color: #3194e6;
}

.sidebar .nav-item i {
    font-size: 23px;
    margin-right: 16px;
}

.sidebar .nav-item span {
    letter-spacing: 1px;
    text-transform: uppercase;
}

.nav-text {
    margin-left: 2rem;
}

#check {
    display: none;
}

label #btn,
label #cancel {
    position: absolute;
    left: 5px;
    cursor: pointer;
    color: #3194e6;
    border-radius: 5px;
    margin: 15px 30px;
    font-size: 29px;
    background-color: #f8f8f8;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 45px;
    transition: all .5s ease;
}

label #cancel {
    opacity: 0;
    visibility: hidden;
}

#check:checked~.sidebar {
    left: 0;
}

#check:checked~label #btn {
    margin-left: 245px;
    opacity: 0;
    visibility: hidden;
}

#check:checked~label #cancel {
    margin-left: 245px;
    opacity: 1;
    visibility: visible;
}

@media(max-width : 860px) {
    .sidebar {
        height: auto;
        width: 70px;
        left: 0;
        margin: 100px 0;
    }

    header,
    #btn,
    #cancel {
        display: none;
    }

    span {
        position: absolute;
        margin-left: 23px;
        opacity: 0;
        visibility: hidden;
    }

    .sidebar .nav-item {
        height: 60px;
    }

    .sidebar .nav-item i {
        margin-left: -10px;
    }

    .nav-item:hover {
        width: 200px;
        background: inherit;
    }

    .sidebar .nav-item:hover span {
        opacity: 1;
        visibility: visible;
    }
}

.sidebar-footer {
    position: absolute;
    width: 13rem;
    bottom: 0;
    margin: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.sidebar-footer span {
    margin-left: 10px;
}

.main-content {
    width: 90%;
    height: 80vh;
    margin: auto;
    text-align: center;
}
</style>