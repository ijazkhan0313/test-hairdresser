<template>
  <div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3  px-0 ps-lg-2 ps-0" style="background-color: #f4f5f7">
          <div class="d-flex flex-column align-items-center align-items-sm-start   pt-2 text-white min-vh-100">
            <nuxt-link
              :to="localePath('/')"
              class="d-flex align-items-center pb-3  text-white text-decoration-none"
              style="align-self: center;"
            >
              <span class=" d-none d-sm-inline pt-3 main-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="225"
                  height="32"
                  viewBox="0 0 225 32"
                  fill="none"
                >
                  <rect width="225" height="32" fill="url(#pattern0)" />
                  <dev>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use
                        xlink:href="#image0_129_831"
                        transform="translate(0 -0.000938841) scale(0.000429185 0.0030177)"
                      />
                    </pattern>
                    <image
                      id="image0_129_831"
                      width="2330"
                      height="332"
                      xlink:href="data:image/png;base64,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"
                    />
                  </dev>
                </svg>
              </span>
            </nuxt-link>
            <ul
              id="menu"
              class="nav  flex-column mb-sm-auto mb-0 align-items-center w-100 align-items-sm-start sidebartext"
            >
              <li class="nav-item py-0 pb-md-1 w-100 ">
                <nuxt-link
                  :to="localePath('/en/setting')"
                  class="nav-link px-3 text-center text-sm-start py-3 list-active align-middle px-0 active text-muted fw-bold"
                >
                  <i class="fa-solid d-sm-none d-block fa-user" /><span class="ms-1 d-none d-sm-inline">{{ t('UserDashboard') }}</span>
                </nuxt-link>
              </li>

              <li class="nav-item py-0 pb-md-1 w-100 ">
                <nuxt-link
                  :to="localePath('/manager/subscription')"
                  class="nav-link px-3 text-center text-sm-start py-3 list-active align-middle px-0 active text-muted fw-bold"
                >
                  <i class="fa-solid d-sm-none d-block fa-user" /><span class="ms-1 d-none d-sm-inline">{{
                    t('Subscriptoins') }}</span>
                </nuxt-link>
              </li>
              <li class="nav-item py-0 pb-md-1 w-100 ">
                <nuxt-link
                  :to="localePath('/manager/invited-user')"
                  class="nav-link px-3 text-center text-sm-start py-3 list-active align-middle px-0 active text-muted fw-bold"
                >
                  <i class="fa-solid d-sm-none d-block fa-user" /><span class="ms-1 d-none d-sm-inline">{{ t('Invite User') }}</span>
                </nuxt-link>
              </li>
            </ul>
            <router-link
              :to="localePath('/')"
              class="d-flex justify-content-left align-items-left position-absolute bottom-0 mb-4 m-4 w-100"
              style="cursor: pointer"
            >
              <i class="fa-solid fa-xmark " style="color: black;font-size: 20px" />
            </router-link>
            <hr>
          </div>
        </div>
        <div class="col-10 col-sm-9 justify-content-end mx-auto">
          <div class="row ">
            <div class="col-12 ">
              <div class="row ">
                <div class="col-4 d-none d-sm-block col-sm-7 col-lg-8 ">
                  <div class="row">
                    <div class=" col-sm-5 col-lg-5 px-0 mx-0" />
                    <div class="col-sm-7 col-lg-7">
                      <h4
                        class="text-center d-none d-sm-block pt-3 ms-4 text-muted fw-bolder"
                        style="margin-left: 8% !important;"
                      >
                        {{ t('Manage Accounts') }}  
                        <span class="text-success" v-if="userStore.user.active_subscription" >(Subscription: {{ userStore.user.active_subscription ?? '' }})</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="pt-2 col-sm-5 col-lg-4 px-1 px-md-3">
                  <ul class="nav  float-end ps-1 py-1 " style="border-radius: 6px;background-color: #f5f5f5">
                    <li class="nav-item mx-1">
                      <a
                        id="foucused-icon"
                        :class="{ 'router-link-exact-active': play }"
                        class="nav-link nav-icons "
                        style="padding: 5px 8px"
                        @click.prevent="playSound"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 19 20" fill="none">
                          <path
                            d="M2.69824 0.055674C1.5521 0.101019 0.5 1.0361 0.5 2.29591V17.7041C0.5 19.3839 2.37138 20.486 3.84082 19.6719L17.7451 11.9678C19.2568 11.1301 19.2568 8.86988 17.7451 8.03224L3.84082 0.328135C3.47346 0.124617 3.08029 0.0405589 2.69824 0.055674ZM2.71582 1.53321C2.84512 1.53266 2.98064 1.56618 3.11328 1.63966L17.0186 9.34376C17.5678 9.64811 17.5678 10.3519 17.0186 10.6563L3.11328 18.3604C2.58272 18.6543 2 18.3104 2 17.7041V2.29591C2 1.99278 2.14535 1.75582 2.35742 1.63087C2.46346 1.5684 2.58652 1.53377 2.71582 1.53321Z"
                            fill="#030504"
                            fill-opacity="0.4"
                          />
                        </svg>
                      </a>
                    </li>

                    <li class="nav-item dropdown ">
                      <a
                        class="nav-link  nav-icons  "
                        style="padding: 5px 8px"
                        aria-current="page"
                        data-bs-toggle="dropdown"
                        href="#"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                          <path
                            d="M8.07207 0.952443C7.8077 0.958068 7.59582 1.17557 7.59957 1.43994V14.3999C7.59957 14.9999 7.6802 15.5681 7.98395 16.0349C8.2877 16.5018 8.8502 16.7999 9.51957 16.7999V20.2499C8.96457 20.4506 8.55957 20.9793 8.55957 21.5999C8.55957 22.3893 9.2102 23.0399 9.99957 23.0399C10.7889 23.0399 11.4396 22.3893 11.4396 21.5999C11.4396 20.9793 11.0346 20.4506 10.4796 20.2499V16.7999C11.0964 16.7999 11.6346 16.5018 11.9514 16.0499C12.2702 15.5962 12.3996 15.0206 12.3996 14.3999V1.43994C12.4014 1.26744 12.3114 1.10619 12.1614 1.01807C12.0114 0.931818 11.8277 0.931818 11.6777 1.01807C11.5277 1.10619 11.4377 1.26744 11.4396 1.43994V14.3999C11.4396 14.8818 11.3289 15.2662 11.1677 15.4968C11.0046 15.7293 10.8227 15.8399 10.4796 15.8399H9.51957C9.08645 15.8399 8.93082 15.7293 8.7902 15.5118C8.6477 15.2943 8.55957 14.9024 8.55957 14.3999V1.43994C8.56145 1.31057 8.51082 1.18494 8.41895 1.09307C8.32707 1.00119 8.20145 0.950568 8.07207 0.952443ZM3.0377 3.83619C2.91207 3.83807 2.79394 3.89057 2.7077 3.98057C0.27582 6.41244 0.27582 10.3724 2.7077 12.8043C2.8277 12.9299 3.0077 12.9806 3.17457 12.9374C3.34332 12.8943 3.47457 12.7612 3.5177 12.5943C3.5627 12.4256 3.51207 12.2474 3.38645 12.1274C1.3202 10.0593 1.3202 6.72557 3.38645 4.65932C3.52895 4.52057 3.5702 4.31057 3.49332 4.12869C3.41645 3.94494 3.23644 3.82869 3.0377 3.83619ZM16.9464 4.08182C16.7514 4.08182 16.5771 4.19994 16.5039 4.38182C16.4308 4.56182 16.4739 4.76994 16.6146 4.90494C18.6789 6.97119 18.6789 10.3068 16.6146 12.3731C16.4889 12.4931 16.4383 12.6731 16.4814 12.8399C16.5246 13.0087 16.6577 13.1399 16.8246 13.1831C16.9933 13.2281 17.1714 13.1774 17.2914 13.0518C19.7252 10.6181 19.7252 6.65994 17.2914 4.22619C17.2014 4.13432 17.0777 4.08182 16.9464 4.08182ZM4.3952 5.19182C4.26957 5.19557 4.15144 5.24807 4.0652 5.33807C2.38144 7.02182 2.38144 9.76494 4.0652 11.4468C4.1852 11.5724 4.3652 11.6231 4.53207 11.5799C4.70082 11.5368 4.83207 11.4037 4.8752 11.2368C4.9202 11.0681 4.86957 10.8899 4.74395 10.7699C3.4277 9.45369 3.4277 7.33307 4.74395 6.01682C4.88645 5.87807 4.9277 5.66807 4.85082 5.48619C4.77395 5.30244 4.59395 5.18619 4.3952 5.19182ZM15.5889 5.43932C15.3939 5.43932 15.2196 5.55744 15.1446 5.73932C15.0714 5.91932 15.1146 6.12744 15.2552 6.26244C16.5714 7.57869 16.5714 9.69932 15.2552 11.0156C15.1296 11.1356 15.0789 11.3156 15.1239 11.4824C15.1671 11.6512 15.2983 11.7824 15.4671 11.8256C15.6339 11.8706 15.8139 11.8199 15.9339 11.6943C17.6177 10.0106 17.6177 7.26744 15.9339 5.58557C15.8439 5.49182 15.7202 5.43932 15.5889 5.43932ZM5.7527 6.54932C5.62707 6.55307 5.50895 6.60557 5.4227 6.69557C4.48895 7.62932 4.48895 9.15744 5.4227 10.0893C5.5427 10.2149 5.7227 10.2656 5.88957 10.2224C6.05832 10.1793 6.18957 10.0462 6.2327 9.87932C6.2777 9.71057 6.22707 9.53244 6.10145 9.41244C5.5352 8.84432 5.5352 7.94057 6.10145 7.37432C6.24395 7.23557 6.2852 7.02557 6.20832 6.84369C6.13144 6.65994 5.95145 6.54369 5.7527 6.54932ZM14.2314 6.79682C14.0364 6.79869 13.8621 6.91682 13.7871 7.09682C13.7139 7.27869 13.7571 7.48494 13.8977 7.62182C14.4639 8.18807 14.4639 9.09182 13.8977 9.65807C13.7721 9.77807 13.7214 9.95807 13.7664 10.1249C13.8096 10.2937 13.9408 10.4249 14.1096 10.4681C14.2764 10.5131 14.4564 10.4624 14.5764 10.3368C15.5102 9.40307 15.5102 7.87682 14.5764 6.94307C14.4864 6.84932 14.3627 6.79869 14.2314 6.79682ZM9.99957 21.1199C10.2696 21.1199 10.4796 21.3299 10.4796 21.5999C10.4796 21.8699 10.2696 22.0799 9.99957 22.0799C9.72957 22.0799 9.51957 21.8699 9.51957 21.5999C9.51957 21.3299 9.72957 21.1199 9.99957 21.1199Z"
                            fill="#030504"
                            fill-opacity="0.4"
                          />
                        </svg>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                        <li class="px-1">
                          <nuxt-link
                            class="dropdown-item py-2 text-muted fw-bold fs-6 "
                            :to="localePath('/')"
                            style="border-bottom: 1px solid lightgray;"
                          >
                            {{ t('Lagoon') }}<span class="float-end"><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="16"
                              viewBox="0 0 20 16"
                              fill="none"
                            >
                              <path
                                d="M12.3998 0.599976C10.5035 0.599976 8.9965 1.29766 7.79124 2.31951C6.58599 3.34135 5.66701 4.67793 4.85921 5.9906C4.05141 7.30327 3.35122 8.59708 2.63265 9.53123C1.91408 10.4654 1.2265 11 0.399838 11C0.346833 10.9992 0.294208 11.009 0.24502 11.0288C0.195833 11.0486 0.151065 11.0779 0.113317 11.1151C0.0755689 11.1523 0.0455945 11.1967 0.0251354 11.2456C0.0046763 11.2945 -0.00585938 11.347 -0.00585937 11.4C-0.00585938 11.453 0.0046763 11.5055 0.0251354 11.5544C0.0455945 11.6033 0.0755689 11.6476 0.113317 11.6848C0.151065 11.7221 0.195833 11.7514 0.24502 11.7712C0.294208 11.7909 0.346833 11.8007 0.399838 11.8C1.57317 11.8 2.48559 11.0346 3.26702 10.0187C4.04845 9.00287 4.74826 7.69668 5.54046 6.40935C6.33266 5.12202 7.21369 3.8586 8.30843 2.93044C9.40318 2.00229 10.6961 1.39998 12.3998 1.39998C12.9883 1.39998 13.9493 1.54797 14.7061 1.93201C15.4629 2.31605 15.9998 2.86361 15.9998 3.79998C15.9998 4.99998 14.1521 5.45958 13.5475 4.40154C13.5159 4.34618 13.4714 4.29918 13.4179 4.26447C13.3644 4.22976 13.3034 4.20834 13.24 4.20199C13.1765 4.19565 13.1125 4.20456 13.0532 4.22799C12.9939 4.25143 12.941 4.2887 12.8991 4.33669C12.598 4.68075 12.3499 4.78486 12.1412 4.80076C11.9326 4.81665 11.7241 4.73981 11.517 4.58201C11.3099 4.42421 11.1192 4.188 10.9897 3.95544C10.8602 3.72288 10.7998 3.48331 10.7998 3.39998C10.8006 3.34697 10.7908 3.29435 10.771 3.24516C10.7513 3.19597 10.7219 3.1512 10.6847 3.11346C10.6475 3.07571 10.6031 3.04573 10.5542 3.02527C10.5053 3.00481 10.4528 2.99428 10.3998 2.99428C10.3468 2.99428 10.2943 3.00481 10.2454 3.02527C10.1965 3.04573 10.1522 3.07571 10.115 3.11346C10.0778 3.1512 10.0484 3.19597 10.0286 3.24516C10.0089 3.29435 9.99909 3.34697 9.99984 3.39998C9.99984 3.71664 10.1145 4.02707 10.2912 4.34451C10.468 4.66195 10.7148 4.97574 11.0326 5.21794C11.2017 5.34674 11.3963 5.45289 11.6076 5.52185C11.6845 7.22951 12.6377 8.77801 14.0506 9.90076C15.5246 11.0721 17.5065 11.8 19.5998 11.8C19.6528 11.8007 19.7055 11.7909 19.7547 11.7712C19.8038 11.7514 19.8486 11.7221 19.8864 11.6848C19.9241 11.6476 19.9541 11.6033 19.9745 11.5544C19.995 11.5055 20.0055 11.453 20.0055 11.4C20.0055 11.347 19.995 11.2945 19.9745 11.2456C19.9541 11.1967 19.9241 11.1523 19.8864 11.1151C19.8486 11.0779 19.8038 11.0486 19.7547 11.0288C19.7055 11.009 19.6528 10.9992 19.5998 11C17.6932 11 15.875 10.3279 14.5491 9.27419C13.2997 8.28141 12.5064 6.96566 12.4178 5.55857C12.6677 5.4903 12.9135 5.34435 13.1522 5.1531C14.3307 6.38442 16.7998 5.63541 16.7998 3.79998C16.7998 2.53634 15.9868 1.6839 15.0686 1.21794C14.1504 0.751985 13.1114 0.599976 12.3998 0.599976ZM9.99359 6.19451C9.88764 6.19616 9.78667 6.23979 9.71285 6.3158C9.63903 6.39182 9.59838 6.49402 9.59984 6.59998C9.59984 7.53331 10.0421 8.48574 10.6201 9.32654C11.1982 10.1673 11.9182 10.893 12.578 11.3328C12.6216 11.3629 12.6709 11.384 12.7228 11.3949C12.7747 11.4059 12.8283 11.4063 12.8804 11.3963C12.9325 11.3863 12.9821 11.3661 13.0263 11.3367C13.0706 11.3074 13.1085 11.2695 13.1379 11.2254C13.1673 11.1812 13.1877 11.1316 13.1978 11.0795C13.2079 11.0275 13.2075 10.9739 13.1967 10.9219C13.1859 10.87 13.1648 10.8207 13.1348 10.777C13.1048 10.7332 13.0663 10.6959 13.0217 10.6672C12.4814 10.307 11.8015 9.63261 11.2795 8.87341C10.7576 8.11421 10.3998 7.26664 10.3998 6.59998C10.4006 6.54646 10.3906 6.49334 10.3704 6.44377C10.3502 6.39419 10.3203 6.34916 10.2824 6.31136C10.2446 6.27355 10.1995 6.24372 10.1499 6.22365C10.1002 6.20358 10.0471 6.19367 9.99359 6.19451ZM7.60531 12.9937C7.45091 12.9937 7.30841 13.0846 7.24281 13.225C7.24281 13.225 6.54771 14.6008 5.20531 14.6008C3.86291 14.6008 3.16781 13.225 3.16781 13.225C3.09421 13.0734 2.93501 12.9824 2.76781 12.9992C2.75541 12.9996 2.74271 13 2.73031 13C2.60391 13.0252 2.49761 13.1078 2.44281 13.225C2.44281 13.225 1.72731 14.6008 0.405306 14.6008C0.261706 14.5992 0.127344 14.6736 0.0537439 14.7984C-0.0182561 14.9236 -0.0182561 15.0771 0.0537439 15.2023C0.127344 15.3275 0.261706 15.4024 0.405306 15.4008C1.76931 15.4008 2.45051 14.5845 2.80531 14.0625C3.15851 14.5861 3.83331 15.4008 5.20531 15.4008C6.57731 15.4008 7.25211 14.5861 7.60531 14.0625C7.95691 14.5861 8.6333 15.4008 10.0053 15.4008C11.3773 15.4008 12.0537 14.5861 12.4053 14.0625C12.7569 14.5861 13.4317 15.4008 14.8053 15.4008C16.1789 15.4008 16.8537 14.5861 17.2053 14.0625C17.5585 14.5845 18.2397 15.4008 19.6053 15.4008C19.7489 15.4024 19.8833 15.3271 19.9569 15.2023C20.0289 15.0771 20.0289 14.9236 19.9569 14.7984C19.8833 14.6732 19.7489 14.5992 19.6053 14.6008C18.2801 14.6008 17.5678 13.225 17.5678 13.225C17.5022 13.0842 17.3597 12.9937 17.2053 12.9937C17.0509 12.9937 16.9084 13.0846 16.8428 13.225C16.8428 13.225 16.1493 14.6008 14.8053 14.6008C13.4613 14.6008 12.7678 13.225 12.7678 13.225C12.7022 13.0842 12.5597 12.9937 12.4053 12.9937C12.2509 12.9937 12.1084 13.0846 12.0428 13.225C12.0428 13.225 11.3493 14.6008 10.0053 14.6008C8.66131 14.6008 7.96781 13.225 7.96781 13.225C7.9022 13.0842 7.75971 12.9937 7.60531 12.9937Z"
                                fill="#030504"
                                fill-opacity="0.8"
                              />
                            </svg></span>
                          </nuxt-link>
                        </li>
                        <li class="px-1">
                          <nuxt-link
                            class="dropdown-item text-muted fw-bold fs-6 py-2"
                            :to="localePath('hometropics')"
                            style="border-bottom: 1px solid lightgray;"
                          >
                            Tropics <span class="float-end"><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M8.96183 0.5875C8.94464 0.590625 8.92745 0.595313 8.91183 0.6C8.72589 0.642188 8.59464 0.809376 8.59933 1V3.4C8.59776 3.54375 8.67276 3.67813 8.79776 3.75156C8.92276 3.82344 9.07589 3.82344 9.20089 3.75156C9.32589 3.67813 9.40089 3.54375 9.39933 3.4V1C9.40401 0.884376 9.35714 0.773438 9.27433 0.695313C9.18995 0.615625 9.07589 0.576563 8.96183 0.5875ZM3.26183 2.9375C3.11183 2.96406 2.99151 3.07344 2.94933 3.21875C2.90714 3.36563 2.95089 3.52188 3.06183 3.625L4.76183 5.325C4.8587 5.44375 5.01339 5.49844 5.16339 5.46406C5.31183 5.42969 5.42901 5.3125 5.46339 5.16406C5.49776 5.01406 5.44308 4.85938 5.32433 4.7625L3.62433 3.0625C3.54151 2.97344 3.4212 2.92813 3.29933 2.9375C3.28683 2.9375 3.27433 2.9375 3.26183 2.9375ZM14.6118 2.9375C14.5212 2.95 14.4368 2.99531 14.3743 3.0625L12.6743 4.7625C12.5556 4.85938 12.5009 5.01406 12.5353 5.16406C12.5696 5.3125 12.6868 5.42969 12.8353 5.46406C12.9853 5.49844 13.14 5.44375 13.2368 5.325L14.9368 3.625C15.0618 3.50625 15.0978 3.32031 15.0243 3.16406C14.9493 3.00625 14.7837 2.91563 14.6118 2.9375ZM8.96183 5C8.94933 5.00313 8.93683 5.00781 8.92433 5.0125C8.89933 5.01406 8.87433 5.01875 8.84933 5.025C8.84464 5.02969 8.84151 5.03281 8.83683 5.0375C6.71495 5.12813 4.99933 6.85625 4.99933 9C4.99933 11.2016 6.79776 13 8.99933 13C11.2009 13 12.9993 11.2016 12.9993 9C12.9993 6.86406 11.2978 5.14219 9.18683 5.0375C9.17276 5.0375 9.16339 5.025 9.14933 5.025C9.1087 5.00938 9.06651 5.00156 9.02433 5C9.01651 5 9.00714 5 8.99933 5C8.98683 5 8.97433 5 8.96183 5ZM8.97433 5.8C8.98214 5.8 8.99151 5.8 8.99933 5.8C9.01183 5.8 9.02433 5.8 9.03683 5.8C10.7868 5.82031 12.1993 7.24531 12.1993 9C12.1993 10.7688 10.7681 12.2 8.99933 12.2C7.23214 12.2 5.79933 10.7688 5.79933 9C5.79933 7.24063 7.21808 5.81406 8.97433 5.8ZM0.886826 8.6C0.666514 8.63125 0.511826 8.83594 0.543076 9.05625C0.574326 9.27656 0.779014 9.43125 0.999326 9.4H3.39933C3.54308 9.40156 3.67745 9.32656 3.75089 9.20156C3.82276 9.07656 3.82276 8.92344 3.75089 8.79844C3.67745 8.67344 3.54308 8.59844 3.39933 8.6H0.999326C0.986826 8.6 0.974326 8.6 0.961826 8.6C0.949326 8.6 0.936826 8.6 0.924326 8.6C0.911826 8.6 0.899326 8.6 0.886826 8.6ZM14.4868 8.6C14.2665 8.63125 14.1118 8.83594 14.1431 9.05625C14.1743 9.27656 14.379 9.43125 14.5993 9.4H16.9993C17.1431 9.40156 17.2775 9.32656 17.3509 9.20156C17.4228 9.07656 17.4228 8.92344 17.3509 8.79844C17.2775 8.67344 17.1431 8.59844 16.9993 8.6H14.5993C14.5868 8.6 14.5743 8.6 14.5618 8.6C14.5493 8.6 14.5368 8.6 14.5243 8.6C14.5118 8.6 14.4993 8.6 14.4868 8.6ZM4.99933 12.55C4.9087 12.5625 4.82433 12.6078 4.76183 12.675L3.06183 14.375C2.94308 14.4719 2.88839 14.6266 2.92276 14.7766C2.95714 14.925 3.07433 15.0422 3.22276 15.0766C3.37276 15.1109 3.52745 15.0563 3.62433 14.9375L5.32433 13.2375C5.44308 13.1234 5.47901 12.9469 5.41495 12.7953C5.35245 12.6438 5.20089 12.5469 5.03683 12.55C5.02433 12.55 5.01183 12.55 4.99933 12.55ZM12.8743 12.55C12.7243 12.5766 12.604 12.6859 12.5618 12.8313C12.5196 12.9781 12.5634 13.1344 12.6743 13.2375L14.3743 14.9375C14.4712 15.0563 14.6259 15.1109 14.7759 15.0766C14.9243 15.0422 15.0415 14.925 15.0759 14.7766C15.1103 14.6266 15.0556 14.4719 14.9368 14.375L13.2368 12.675C13.1618 12.5953 13.0587 12.5516 12.9493 12.55C12.9368 12.55 12.9243 12.55 12.9118 12.55C12.8993 12.55 12.8868 12.55 12.8743 12.55ZM8.96183 14.1875C8.94464 14.1906 8.92745 14.1953 8.91183 14.2C8.72589 14.2422 8.59464 14.4094 8.59933 14.6V17C8.59776 17.1438 8.67276 17.2781 8.79776 17.3516C8.92276 17.4234 9.07589 17.4234 9.20089 17.3516C9.32589 17.2781 9.40089 17.1438 9.39933 17V14.6C9.40401 14.4844 9.35714 14.3734 9.27433 14.2953C9.18995 14.2156 9.07589 14.1766 8.96183 14.1875Z"
                                fill="#030504"
                                fill-opacity="0.8"
                              />
                            </svg></span>
                          </nuxt-link>
                        </li>
                        <li class="px-1">
                          <nuxt-link
                            class="dropdown-item text-muted fw-bold fs-6 py-2"
                            :to="localePath('homeforest')"
                            style="border-bottom: 1px solid lightgray;"
                          >
                            Forest <span class="float-end">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M14.0125 -0.000601758C13.8859 0.0150232 13.775 0.0884606 13.7125 0.199398L10.7125 5.5744C10.6578 5.67284 10.6453 5.79002 10.6813 5.89784C10.7172 6.00409 10.7969 6.09159 10.9 6.1369C10.9 6.1369 11.2688 6.28846 11.725 6.4369L11.0375 7.6119C10.9187 7.44002 10.7812 7.2994 10.6375 7.1994C10.4375 7.06034 10.3219 7.04471 10.1625 6.9869C10.2656 6.72127 10.4 6.46502 10.4 6.1619C10.4 5.17127 9.775 4.34002 8.9125 4.0119C8.91719 3.95721 8.925 3.90877 8.925 3.8494C8.925 2.15721 7.58906 0.761898 5.9375 0.761898C4.81406 0.761898 3.85625 1.43065 3.35 2.3744C2.28906 2.5619 1.475 3.48846 1.475 4.6244C1.475 4.72284 1.48906 4.81659 1.5 4.9119C1.04063 5.45565 0.7375 6.1494 0.7375 6.9244C0.7375 7.22752 0.8 7.50096 0.875 7.7619C0.804688 7.98377 0.7375 8.21346 0.7375 8.4619C0.7375 8.66659 0.789062 8.85252 0.8375 9.0369C0.348438 9.46346 0 10.0556 0 10.7619C0 11.7588 0.629688 12.5885 1.5 12.9119C1.49531 12.9682 1.475 13.0166 1.475 13.0744C1.475 14.3432 2.48125 15.3869 3.725 15.3869C4.01406 15.3869 4.31406 15.4275 4.6375 15.3869C4.72813 15.376 4.81875 15.3322 4.9125 15.2994C5.03906 16.1385 5.075 16.8228 5.0125 17.2619C4.93438 17.8119 4.77656 18.0807 4.6 18.2744C4.42344 18.4682 4.21094 18.5697 3.9875 18.7369C3.875 18.8213 3.75781 18.94 3.675 19.1119C3.59219 19.2838 3.57813 19.49 3.625 19.6869C3.64063 19.84 3.74375 19.9713 3.88906 20.0228C4.03438 20.0744 4.19688 20.0369 4.30625 19.9291C4.41406 19.8197 4.45156 19.6572 4.4 19.5119C4.38281 19.4432 4.38906 19.4572 4.3875 19.4619C4.38594 19.4666 4.40781 19.4369 4.475 19.3869C4.60938 19.2869 4.90625 19.1197 5.1875 18.8119C5.46875 18.5041 5.71719 18.0541 5.8125 17.3744C5.875 16.9369 5.87188 16.3932 5.8 15.7369C5.98438 15.7947 6.1625 15.815 6.325 15.8119C6.43438 15.8103 6.54219 15.8025 6.6375 15.7869C6.70938 17.4478 7.12031 18.3682 7.575 18.9119C7.825 19.2103 8.08906 19.4041 8.2375 19.5244C8.3125 19.5853 8.35156 19.6228 8.3625 19.6369C8.40469 19.8275 8.57812 19.9588 8.77188 19.9494C8.96719 19.94 9.12656 19.7931 9.15 19.5994C9.15 19.4291 9.08438 19.2603 9 19.1494C8.91563 19.0385 8.825 18.9713 8.7375 18.8994C8.56094 18.7572 8.38438 18.6197 8.2 18.3994C7.88594 18.0244 7.59375 17.2385 7.5 15.8869C7.77656 15.9385 8.04219 15.9338 8.25 15.8869C8.34531 15.865 8.425 15.84 8.5 15.8119C8.71563 15.9432 9.075 16.126 9.625 16.3119C10.3797 16.5666 11.4922 16.8181 13.0375 16.8994L13.0625 17.0869C13.0641 17.0978 13.0609 17.101 13.0625 17.1119C13.1406 17.9057 13.0703 18.3791 12.9625 18.6119C12.8531 18.8463 12.7516 18.8869 12.5875 18.9244C12.4234 18.9619 12.2109 18.951 11.975 18.9619C11.8562 18.9666 11.7109 18.9525 11.5375 19.0869C11.3641 19.2213 11.3031 19.4994 11.3375 19.6744C11.3625 19.8588 11.5109 20.001 11.6953 20.0182C11.8797 20.0369 12.0531 19.9244 12.1125 19.7494C12.2609 19.751 12.475 19.7775 12.7625 19.7119C13.0938 19.6353 13.4812 19.3916 13.6875 18.9494C13.8938 18.5072 13.9547 17.9041 13.8625 17.0119C13.8625 17.0041 13.8625 16.9947 13.8625 16.9869L13.85 16.9244C13.9469 16.926 14.0391 16.9244 14.1375 16.9244C14.3875 16.9244 14.6203 16.9197 14.85 16.9119C14.85 17.0588 14.8547 17.1853 14.85 17.3994C14.8359 18.1525 14.8734 18.6353 14.9875 18.9994C15.1016 19.3635 15.3578 19.6275 15.625 19.7119C15.8922 19.7963 16.0969 19.7682 16.2125 19.7744C16.3281 19.7807 16.3219 19.7666 16.3875 19.8494C16.525 20.0228 16.7781 20.0494 16.95 19.9119C17.1234 19.7744 17.15 19.5213 17.0125 19.3494C16.7953 19.0791 16.4688 18.9869 16.25 18.9744C16.0312 18.9619 15.8953 18.9603 15.8625 18.9494C15.8297 18.9385 15.8156 18.9744 15.75 18.7619C15.6844 18.5494 15.6375 18.1244 15.65 17.4119C15.6547 17.1822 15.65 17.0385 15.65 16.8744C16.9688 16.7744 17.9125 16.5447 18.575 16.3119C19.0203 16.1557 19.3281 15.9994 19.5375 15.8744C19.7469 15.7494 19.875 15.6369 19.875 15.6369C20.0188 15.5041 20.0438 15.2869 19.9375 15.1244L17.725 11.7119C17.7313 11.7103 17.7437 11.7135 17.75 11.7119C18.1094 11.5681 18.3578 11.4291 18.525 11.3119C18.6922 11.1947 18.7875 11.0744 18.7875 11.0744C18.9016 10.9463 18.9219 10.7603 18.8375 10.6119L16.4125 6.4494C16.6328 6.37752 16.8406 6.30409 16.975 6.2494C17.0562 6.21659 17.1187 6.18221 17.1625 6.1619C17.1844 6.15252 17.2 6.14315 17.2125 6.1369C17.2188 6.13377 17.2219 6.13846 17.225 6.1369C17.2281 6.13534 17.2375 6.1369 17.2375 6.1369L17.05 5.7744L17.4 5.5744L14.4125 0.199398C14.3328 0.0572106 14.1734 -0.0209143 14.0125 -0.000601758ZM14.0625 1.2244L16.5 5.5744C16.3719 5.6244 16.2484 5.66659 16.0625 5.7244C15.5516 5.88221 14.85 6.0369 14.1 6.0369C12.95 6.0369 12.0734 5.73377 11.6375 5.5619L14.0625 1.2244ZM5.9375 1.5619C7.13906 1.5619 8.125 2.57284 8.125 3.8494C8.125 3.95565 8.10781 4.07752 8.0875 4.2119C8.05781 4.4244 8.20156 4.6244 8.4125 4.6619C9.08125 4.7869 9.6 5.40409 9.6 6.1619C9.6 6.47596 9.50313 6.75721 9.35 6.9994C9.28125 7.10409 9.26562 7.23377 9.30781 7.35252C9.35 7.46971 9.44375 7.5619 9.5625 7.5994C9.74375 7.6619 9.975 7.72284 10.175 7.8619C10.3672 7.99627 10.5 8.15096 10.525 8.4869L9.2875 10.6119C9.19375 10.7697 9.22031 10.9697 9.35 11.0994C9.35 11.0994 9.4875 11.2385 9.7375 11.3869C9.88438 11.4744 10.1828 11.576 10.425 11.6744L8.2375 15.0494C8.18594 15.0682 8.14375 15.0838 8.075 15.0994C7.85781 15.1478 7.58125 15.1525 7.2625 14.9494C7.25469 14.9447 7.24531 14.9432 7.2375 14.9369C7.23281 14.9322 7.22969 14.9291 7.225 14.9244C7.21719 14.9197 7.20781 14.915 7.2 14.9119C7.19531 14.9119 7.19219 14.9119 7.1875 14.9119C7.17969 14.9072 7.17031 14.9025 7.1625 14.8994C7.15781 14.8947 7.15469 14.8916 7.15 14.8869C7.14219 14.8869 7.13281 14.8869 7.125 14.8869C7.12031 14.8822 7.11719 14.8791 7.1125 14.8744C7.10469 14.8744 7.09531 14.8744 7.0875 14.8744C7.08281 14.8744 7.07969 14.8744 7.075 14.8744C7.06719 14.8744 7.05781 14.8744 7.05 14.8744C7.0375 14.8744 7.025 14.8744 7.0125 14.8744C6.975 14.8728 6.9375 14.8775 6.9 14.8869C6.8875 14.89 6.875 14.8947 6.8625 14.8994C6.8625 14.8994 6.6 15.0072 6.3125 15.0119C6.025 15.0166 5.80156 14.9931 5.6375 14.6244C5.63438 14.6119 5.62969 14.5994 5.625 14.5869C5.625 14.5822 5.625 14.5791 5.625 14.5744C5.62188 14.5603 5.61563 14.551 5.6125 14.5369C5.58281 14.3775 5.45938 14.251 5.3 14.2182C5.14063 14.1853 4.97813 14.2525 4.8875 14.3869C4.78438 14.5416 4.72344 14.5635 4.5375 14.5869C4.35156 14.6103 4.06563 14.5869 3.725 14.5869C2.92969 14.5869 2.275 13.9275 2.275 13.0744C2.275 12.9635 2.28906 12.8494 2.3125 12.7369C2.33438 12.6322 2.31406 12.5228 2.25469 12.4338C2.19688 12.3447 2.10469 12.2822 2 12.2619C1.32813 12.1385 0.8 11.5213 0.8 10.7619C0.8 10.2119 1.08125 9.74159 1.4875 9.4744C1.63594 9.37127 1.69844 9.18221 1.6375 9.0119C1.57344 8.8369 1.5375 8.65096 1.5375 8.4619C1.5375 8.2619 1.58125 8.06659 1.65 7.8869C1.67969 7.80252 1.67969 7.70877 1.65 7.6244C1.57813 7.39002 1.5375 7.1619 1.5375 6.9244C1.5375 6.27909 1.79375 5.70096 2.2 5.2869C2.29219 5.19471 2.33438 5.06502 2.3125 4.9369C2.29219 4.8369 2.275 4.73065 2.275 4.6244C2.275 3.80565 2.88594 3.1619 3.6375 3.1119C3.78594 3.10096 3.91563 3.01034 3.975 2.8744C4.32813 2.09471 5.06719 1.5619 5.9375 1.5619ZM12.5625 6.5994C13.0453 6.70721 13.5125 6.8369 14.1 6.8369C14.6562 6.8369 15.1484 6.74784 15.6 6.6494L17.9625 10.6994C17.8438 10.776 17.7047 10.8728 17.45 10.9744C16.8422 11.2166 15.7937 11.4744 14.1125 11.4744C12.7844 11.4744 11.8547 11.3119 11.2 11.1244C11.1828 11.1197 11.1547 11.1166 11.1375 11.1119C11.1141 11.101 11.0875 11.0931 11.0625 11.0869C10.6438 10.9556 10.3406 10.8041 10.1625 10.6994L12.5625 6.5994ZM11.2125 11.9369C11.9281 12.1213 12.8422 12.2744 14.1125 12.2744C15.3578 12.2744 16.2156 12.1166 16.9125 11.9369L19.05 15.2244C18.8859 15.3182 18.6719 15.4353 18.3125 15.5619C17.5188 15.8416 16.1984 16.1244 14.1375 16.1244C12.0766 16.1244 10.7063 15.8307 9.875 15.5494C9.28906 15.351 9.22969 15.2744 9.1 15.1869L11.2125 11.9369Z"
                                  fill="#030504"
                                  fill-opacity="0.8"
                                />
                              </svg></span>
                          </nuxt-link>
                        </li>
                        <li class="px-1">
                          <nuxt-link class="dropdown-item text-muted fw-bold fs-6 py-2" :to="localePath('homemeadow')">
                            Meadow <span class="float-end">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M2.69965 0.800019C2.65903 0.806269 2.61215 0.826581 2.54965 0.862519C2.48715 0.898457 2.41528 0.970331 2.37465 1.06252C2.33403 1.15471 2.32622 1.25002 2.33715 1.31252C2.38247 1.56252 2.46215 1.55783 2.52465 1.62502C2.64809 1.75939 2.82465 1.92658 3.06215 2.17502C3.53559 2.67189 4.23247 3.47814 4.96215 4.77502C6.04341 6.69846 7.19184 9.68752 7.71215 14.2375C7.08559 12.7875 6.25434 11.5813 5.39965 10.6125C4.52465 9.62189 3.62778 8.88596 2.88715 8.38752C2.51684 8.13752 2.18715 7.94377 1.91215 7.81252C1.63715 7.68127 1.45903 7.60002 1.19965 7.60002C1.14653 7.60002 1.09028 7.60158 0.999654 7.63752C0.90903 7.67346 0.762154 7.78283 0.724654 7.92502C0.687154 8.06721 0.735592 8.16408 0.762154 8.22502C0.788717 8.28596 0.810592 8.32502 0.837154 8.36252C0.944967 8.50939 1.07622 8.64377 1.26215 8.83752C1.63403 9.22346 2.1934 9.81252 2.77465 10.675C3.93715 12.4016 5.19965 15.2 5.19965 19.575C5.19809 19.7188 5.27309 19.8531 5.39809 19.9266C5.52309 19.9985 5.67622 19.9985 5.80122 19.9266C5.92622 19.8531 6.00122 19.7188 5.99965 19.575C5.99965 15.0453 4.67465 12.0625 3.43715 10.225C3.08872 9.70783 2.83715 9.47033 2.53715 9.12502C3.2059 9.58596 4.01059 10.2563 4.79965 11.15C6.45122 13.0203 7.99966 15.8094 7.99966 19.575C8.00122 19.6 8.00591 19.625 8.01216 19.65C8.0184 19.6891 8.03091 19.7266 8.04965 19.7625C8.06528 19.7985 8.08715 19.8328 8.11215 19.8625C8.13091 19.8813 8.15278 19.8985 8.17465 19.9125C8.18716 19.9219 8.19966 19.9297 8.21215 19.9375C8.24809 19.9563 8.28559 19.9688 8.32466 19.975C8.37778 19.986 8.43403 19.986 8.48715 19.975C8.52778 19.9641 8.56528 19.9469 8.59966 19.925C8.60747 19.9219 8.61684 19.9172 8.62466 19.9125C8.64809 19.8938 8.66841 19.8735 8.68716 19.85C8.71684 19.825 8.74184 19.7953 8.76216 19.7625C8.7809 19.7235 8.79341 19.6813 8.79965 19.6375C8.80122 19.6172 8.80122 19.5953 8.79965 19.575C8.79965 11.7766 7.19497 7.11252 5.66215 4.38752C5.29965 3.74221 4.9434 3.21721 4.61215 2.77502C5.32934 3.37346 6.13716 4.17033 6.96215 5.33752C8.70122 7.79689 10.3731 11.636 10.7247 17.35C10.7231 17.3672 10.7231 17.3828 10.7247 17.4C10.7247 17.4047 10.7247 17.4078 10.7247 17.4125C10.7278 17.4203 10.7325 17.4297 10.7372 17.4375C10.7778 18.125 10.7997 18.8328 10.7997 19.575C10.7981 19.7188 10.8731 19.8531 10.9981 19.9266C11.1231 19.9985 11.2762 19.9985 11.4012 19.9266C11.5262 19.8531 11.6012 19.7188 11.5997 19.575C11.5997 18.811 11.5668 18.0844 11.5247 17.375C11.5278 17.35 11.5278 17.325 11.5247 17.3C11.5247 17.2953 11.5247 17.2922 11.5247 17.2875C11.6903 11.7266 13.234 8.61252 14.6247 6.87502C15.3215 6.00627 15.9825 5.47502 16.4372 5.16252C16.6637 5.00627 16.8293 4.91408 16.9497 4.83752C17.0106 4.79846 17.0418 4.83127 17.1622 4.66252C17.1918 4.62033 17.2403 4.53439 17.2372 4.40002C17.234 4.26564 17.1387 4.12658 17.0622 4.07502C16.909 3.97189 16.8559 4.00158 16.8122 4.00002C16.6012 3.99064 16.2512 4.02971 15.7122 4.18752C15.1731 4.34533 14.484 4.63127 13.7622 5.13752C12.5012 6.02033 11.1528 7.58439 10.2497 10.25C9.52466 8.01877 8.5809 6.24533 7.61215 4.87502C6.58559 3.42346 5.5309 2.42346 4.67465 1.77502C4.24653 1.45002 3.8684 1.22033 3.56215 1.06252C3.2559 0.904707 3.08247 0.800019 2.79965 0.800019C2.77153 0.800019 2.74028 0.793769 2.69965 0.800019ZM14.8247 5.50002C14.5575 5.75939 14.284 6.02033 13.9997 6.37502C12.8512 7.80783 11.6653 10.075 11.0872 13.6C10.9637 12.9188 10.8106 12.2797 10.6497 11.6625C10.6512 11.6578 10.6481 11.6547 10.6497 11.65C11.4793 8.37971 12.9403 6.68752 14.2247 5.78752C14.4497 5.62971 14.6137 5.61252 14.8247 5.50002ZM19.5997 7.60002C19.3403 7.60002 19.1637 7.69377 18.8997 7.82502C18.6356 7.95627 18.3262 8.13752 17.9747 8.38752C17.2715 8.88752 16.4106 9.63439 15.5872 10.625C13.9387 12.6078 12.3997 15.5953 12.3997 19.575C12.3981 19.7188 12.4731 19.8531 12.5981 19.9266C12.7231 19.9985 12.8762 19.9985 13.0012 19.9266C13.1262 19.8531 13.2012 19.7188 13.1997 19.575C13.1997 15.8016 14.659 13.0063 16.2122 11.1375C16.9887 10.2031 17.7903 9.50939 18.4372 9.05002C18.4465 9.04377 18.4528 9.04377 18.4622 9.03752C18.1715 9.39846 17.9137 9.66877 17.5622 10.2375C16.4293 12.0735 15.1997 15.0516 15.1997 19.575C15.1981 19.7188 15.2731 19.8531 15.3981 19.9266C15.5231 19.9985 15.6762 19.9985 15.8012 19.9266C15.9262 19.8531 16.0012 19.7188 15.9997 19.575C15.9997 15.1953 17.1715 12.3891 18.2372 10.6625C18.77 9.79846 19.2762 9.21252 19.6122 8.82502C19.7809 8.63127 19.9028 8.49689 19.9997 8.33752C20.0481 8.25783 20.1637 8.14377 20.0622 7.88752C20.0106 7.75939 19.8856 7.66877 19.7997 7.63752C19.7137 7.60627 19.6528 7.60002 19.5997 7.60002Z"
                                  fill="#030504"
                                  fill-opacity="0.8"
                                />
                              </svg></span>
                          </nuxt-link>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item mx-1  dropdown">
                      <a
                        class="nav-link nav-icons  "
                        style="padding: 5px 8px"
                        data-bs-auto-close="outside"
                        data-bs-toggle="dropdown"
                        href="#"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 22 24" fill="none">
                          <path
                            d="M11.0004 0.47998C5.4519 0.47998 0.92043 4.77028 0.92043 10.08C0.856824 10.0791 0.793674 10.0908 0.734649 10.1146C0.675625 10.1383 0.621903 10.1735 0.576605 10.2181C0.531308 10.2628 0.495338 10.316 0.470787 10.3747C0.446236 10.4334 0.433594 10.4964 0.433594 10.56C0.433594 10.6236 0.446236 10.6866 0.470787 10.7453C0.495338 10.8039 0.531308 10.8572 0.576605 10.9018C0.621903 10.9465 0.675625 10.9817 0.734649 11.0054C0.793674 11.0291 0.856824 11.0409 0.92043 11.04H1.88043C1.94404 11.0409 2.00719 11.0291 2.06621 11.0054C2.12524 10.9817 2.17896 10.9465 2.22426 10.9018C2.26955 10.8572 2.30552 10.8039 2.33007 10.7453C2.35462 10.6866 2.36727 10.6236 2.36727 10.56C2.36727 10.4964 2.35462 10.4334 2.33007 10.3747C2.30552 10.316 2.26955 10.2628 2.22426 10.2181C2.17896 10.1735 2.12524 10.1383 2.06621 10.1146C2.00719 10.0908 1.94404 10.0791 1.88043 10.08C1.88043 9.91324 1.89685 9.75035 1.90668 9.58592C1.97363 9.61 2.0451 9.6189 2.11592 9.61196C2.18673 9.60503 2.25512 9.58245 2.31613 9.54584C2.37714 9.50923 2.42926 9.45952 2.4687 9.4003C2.50814 9.34107 2.53392 9.27383 2.54418 9.20342C2.70278 8.30776 3.42671 6.80505 4.79699 5.57623C6.16728 4.34741 8.16847 3.35998 10.9517 3.35998C13.7349 3.35998 15.7361 4.34741 17.1064 5.57623C18.4767 6.80505 19.2006 8.30776 19.3592 9.20342C19.3707 9.2827 19.4018 9.35784 19.4498 9.422C19.4977 9.48616 19.561 9.5373 19.6338 9.57076C19.7066 9.60422 19.7866 9.61893 19.8665 9.61355C19.9464 9.60818 20.0237 9.58288 20.0914 9.53998C20.1031 9.71946 20.1204 9.89773 20.1204 10.08C20.0568 10.0791 19.9937 10.0908 19.9347 10.1146C19.8756 10.1383 19.8219 10.1735 19.7766 10.2181C19.7313 10.2628 19.6953 10.316 19.6708 10.3747C19.6462 10.4334 19.6336 10.4964 19.6336 10.56C19.6336 10.6236 19.6462 10.6866 19.6708 10.7453C19.6953 10.8039 19.7313 10.8572 19.7766 10.9018C19.8219 10.9465 19.8756 10.9817 19.9347 11.0054C19.9937 11.0291 20.0568 11.0409 20.1204 11.04H21.0804C21.144 11.0409 21.2072 11.0291 21.2662 11.0054C21.3252 10.9817 21.379 10.9465 21.4243 10.9018C21.4696 10.8572 21.5055 10.8039 21.5301 10.7453C21.5546 10.6866 21.5673 10.6236 21.5673 10.56C21.5673 10.4964 21.5546 10.4334 21.5301 10.3747C21.5055 10.316 21.4696 10.2628 21.4243 10.2181C21.379 10.1735 21.3252 10.1383 21.2662 10.1146C21.2072 10.0908 21.144 10.0791 21.0804 10.08C21.0804 4.77028 16.549 0.47998 11.0004 0.47998ZM11.0004 1.43998C14.9107 1.43998 18.2181 3.76325 19.5204 7.01811C19.0986 6.29404 18.5119 5.54723 17.7476 4.86186C16.2191 3.49111 13.9645 2.39998 10.9517 2.39998C7.93889 2.39998 5.6843 3.49111 4.15574 4.86186C3.55428 5.40123 3.06686 5.97857 2.67918 6.55311C4.10045 3.54398 7.27854 1.43998 11.0004 1.43998ZM0.92043 12V13.3462H0.951368C0.664895 13.6177 0.44043 14.0639 0.44043 14.6747C0.44043 15.1667 0.578073 15.8774 0.802305 16.7531C1.02654 17.6288 1.34281 18.641 1.71824 19.6106C2.09368 20.5802 2.52498 21.5046 3.00262 22.2178C3.48025 22.931 4.00733 23.52 4.76043 23.52C5.37357 23.52 5.81461 23.1402 6.03918 22.7503V22.7494C6.06026 22.7128 6.07016 22.6823 6.08606 22.6481C6.2838 22.7089 6.50363 22.7372 6.73949 22.7372C7.02194 22.7372 7.30006 22.6572 7.51387 22.4915C7.72767 22.3259 7.86177 22.0936 7.93668 21.8559C8.08649 21.3806 8.05007 20.8531 7.95356 20.2762C7.76052 19.1225 7.27091 17.7692 6.87449 16.7203C6.47725 15.6685 6.12135 14.6762 5.69512 13.9022C5.482 13.5152 5.25182 13.1784 4.96106 12.9187C4.67029 12.6591 4.29583 12.48 3.88668 12.48C3.36613 12.48 2.89718 12.7053 2.63699 13.0837C2.62622 13.0994 2.6208 13.1174 2.61074 13.1334C2.43266 13.0471 2.19275 12.96 1.88043 12.96V12H0.92043ZM20.1204 12V12.96C19.8081 12.96 19.5682 13.0471 19.3901 13.1334C19.3801 13.1174 19.3746 13.0994 19.3639 13.0837C19.1037 12.7053 18.6347 12.48 18.1142 12.48C17.705 12.48 17.3306 12.6591 17.0398 12.9187C16.749 13.1784 16.5189 13.5152 16.3057 13.9022C15.8795 14.6762 15.5236 15.6685 15.1264 16.7203C14.73 17.7692 14.2403 19.1225 14.0473 20.2762C13.9508 20.8531 13.9144 21.3806 14.0642 21.8559C14.1391 22.0936 14.2732 22.3259 14.487 22.4915C14.7008 22.6572 14.9789 22.7372 15.2614 22.7372C15.4969 22.7372 15.7163 22.7087 15.9139 22.6481C15.9299 22.6826 15.9403 22.7134 15.9617 22.7503C16.1863 23.1402 16.6273 23.52 17.2404 23.52C17.9935 23.52 18.5206 22.931 18.9982 22.2178C19.4759 21.5046 19.9072 20.5802 20.2826 19.6106C20.6581 18.641 20.9743 17.6288 21.1986 16.7531C21.4228 15.8774 21.5604 15.1667 21.5604 14.6747C21.5604 14.0639 21.336 13.6177 21.0495 13.3462H21.0804V12H20.1204ZM3.88668 13.44C4.03457 13.44 4.15563 13.4875 4.32074 13.635C4.48585 13.7824 4.67154 14.0336 4.85418 14.3653C5.21947 15.0286 5.57633 16.0004 5.97637 17.0597C6.36763 18.0949 6.83792 19.426 7.00668 20.4347C7.09106 20.939 7.08544 21.3619 7.02074 21.5672C6.98839 21.6698 6.95448 21.7101 6.92606 21.7322C6.89763 21.7542 6.85833 21.7772 6.73949 21.7772C6.39542 21.7772 6.30195 21.7301 6.21449 21.6525C6.12703 21.5748 6.01056 21.379 5.84981 21.0234C5.54352 20.346 5.00116 18.8189 4.54387 17.5894C4.31722 16.98 4.04965 16.245 3.82481 15.6019C3.60009 14.9591 3.41391 14.3824 3.37012 14.1928V14.1919C3.3095 13.9276 3.35352 13.7362 3.42824 13.6275C3.50309 13.5186 3.61091 13.44 3.88668 13.44ZM18.1142 13.44C18.39 13.44 18.4978 13.5186 18.5726 13.6275C18.6475 13.7363 18.6918 13.9278 18.6307 14.1928C18.587 14.3824 18.4008 14.9591 18.1761 15.6019C17.9512 16.245 17.6836 16.98 17.457 17.5894C16.9997 18.8188 16.4571 20.3456 16.1511 21.0234C15.9903 21.379 15.8738 21.5748 15.7864 21.6525C15.6989 21.7301 15.6054 21.7772 15.2614 21.7772C15.1425 21.7772 15.1032 21.7542 15.0748 21.7322C15.0464 21.7101 15.0125 21.6698 14.9801 21.5672C14.9154 21.3619 14.9098 20.939 14.9942 20.4347C15.1629 19.426 15.6332 18.0949 16.0245 17.0597C16.4245 16.0004 16.7814 15.0286 17.1467 14.3653C17.3293 14.0336 17.515 13.7824 17.6801 13.635C17.8452 13.4875 17.9663 13.44 18.1142 13.44ZM1.88043 13.92C2.06945 13.92 2.14079 13.9561 2.24512 14.0147C2.28247 14.0356 2.33716 14.073 2.39137 14.1075C2.39944 14.2073 2.41152 14.3078 2.43449 14.4075C2.43449 14.4078 2.43449 14.4081 2.43449 14.4084C2.50797 14.727 2.69021 15.2665 2.91824 15.9187C3.14628 16.571 3.41547 17.3099 3.64387 17.924C4.09665 19.1415 4.6238 20.6411 4.97512 21.4181C5.07725 21.644 5.17427 21.8488 5.29668 22.035C5.29211 22.0493 5.28281 22.0695 5.27887 22.0819C5.2479 22.1791 5.22983 22.2319 5.20762 22.2703C5.13163 22.4024 4.93996 22.56 4.76043 22.56C4.61353 22.56 4.21061 22.2973 3.79949 21.6834C3.38838 21.0696 2.97218 20.1923 2.61262 19.2637C2.25305 18.3351 1.94682 17.3527 1.73231 16.515C1.51779 15.6772 1.40043 14.9555 1.40043 14.6747C1.40043 14.2124 1.52754 14.0885 1.63199 14.0109C1.73644 13.9334 1.90014 13.92 1.88043 13.92ZM20.1204 13.92C20.1007 13.92 20.2644 13.9334 20.3689 14.0109C20.4733 14.0885 20.6004 14.2124 20.6004 14.6747C20.6004 14.9555 20.4831 15.6772 20.2686 16.515C20.054 17.3527 19.7478 18.3351 19.3882 19.2637C19.0287 20.1923 18.6125 21.0696 18.2014 21.6834C17.7903 22.2973 17.3873 22.56 17.2404 22.56C17.0609 22.56 16.8693 22.4024 16.7932 22.2703C16.771 22.2319 16.753 22.1791 16.722 22.0819C16.7181 22.0695 16.7088 22.0493 16.7042 22.035C16.8266 21.8488 16.9236 21.644 17.0257 21.4181C17.3763 20.6416 17.9042 19.1416 18.357 17.924C18.5854 17.3099 18.8546 16.571 19.0826 15.9187C19.3107 15.2665 19.4929 14.727 19.5664 14.4084C19.5664 14.4081 19.5664 14.4078 19.5664 14.4075C19.5893 14.3078 19.6014 14.2073 19.6095 14.1075C19.6637 14.073 19.7184 14.0356 19.7557 14.0147C19.8601 13.9561 19.9314 13.92 20.1204 13.92Z"
                            fill="#030504"
                            fill-opacity="0.4"
                          />
                        </svg>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                        <li class="px-1">
                          <div id="accordionFlushExample" class="accordion accordion-flush p-0 m-0">
                            <div class="accordion-item">
                              <h4 id="flush-headingOne" class="accordion-header">
                                <button
                                  class="accordion-button accordion-button-homebar text-muted fs-6 fw-bold py-2 px-3 m-0 collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseOne"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseOne"
                                >
                                  Headphones Type
                                </button>
                              </h4>
                              <div
                                id="flush-collapseOne"
                                class="p-0 m-0 accordion-collapse collapse"
                                aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div class="accordion-body p-0 m-0">
                                  <ul class="nav flex-column">
                                    <li class="nav-item">
                                      <a
                                        :class="{ 'drop-active': form.headphone_type == 'In-ear' }"
                                        class="nav-link  text-decoration-none text-muted"
                                        aria-current="page"
                                        href="#"
                                        @click.prevent="saveSetting('In-ear', 'headphone')"
                                      >In-Ear <span
                                        class="float-end"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="14"
                                          viewBox="0 0 20 14"
                                          fill="none"
                                        >
                                          <path
                                            d="M5.86326 0.60383C5.69013 0.609264 5.51657 0.627075 5.34451 0.657737C4.88569 0.739501 4.4352 0.912309 4.02107 1.18117L3.30544 1.64524C2.71774 2.02688 2.27864 2.55432 2.00544 3.14758C1.98493 3.14951 1.96412 3.14938 1.94373 3.15227H1.94294C1.75699 3.17883 1.57619 3.24528 1.41404 3.35071C-0.00156889 4.27007 -0.428929 6.152 0.481226 7.54055C1.39142 8.92916 3.28901 9.29666 4.70466 8.37727C4.74672 8.34996 4.78281 8.3166 4.82107 8.28508V12.3999C4.82107 13.1684 5.45259 13.7999 6.22107 13.7999H6.62107C7.38955 13.7999 8.02107 13.1684 8.02107 12.3999V7.17571C9.63509 6.08744 10.0866 3.89546 9.01638 2.26321H9.0156L8.98826 2.22102C8.27851 1.13851 7.07518 0.565795 5.86326 0.60383ZM14.1367 0.60383C12.9248 0.565795 11.7215 1.13853 11.0117 2.22102L10.9844 2.26321H10.9836C9.91334 3.89546 10.3649 6.08744 11.9789 7.17571V12.3999C11.9789 13.1684 12.6104 13.7999 13.3789 13.7999H13.7789C14.5474 13.7999 15.1789 13.1684 15.1789 12.3999V8.28508C15.2171 8.3166 15.2532 8.34996 15.2953 8.37727C16.7109 9.29666 18.6085 8.92916 19.5187 7.54055C20.4289 6.152 20.0015 4.27007 18.5859 3.35071C18.4238 3.24528 18.243 3.17883 18.057 3.15227H18.0562C18.0358 3.14937 18.015 3.14951 17.9945 3.14758C17.7213 2.55435 17.2822 2.02688 16.6945 1.64524L15.9789 1.18117C15.5648 0.912309 15.1143 0.739501 14.6554 0.657737C14.4834 0.627075 14.3098 0.609264 14.1367 0.60383ZM6.02576 1.39836C6.92104 1.41207 7.79198 1.85474 8.31951 2.6593V2.66008L8.34763 2.70227C9.19089 3.98939 8.82915 5.69986 7.53513 6.54055L7.38201 6.63977L6.81951 7.00539C6.34418 7.31393 5.81229 7.45778 5.28591 7.45539C5.29385 7.39239 5.29784 7.3285 5.29607 7.26399C5.28081 6.71556 5.13096 5.85253 4.51638 4.91555C3.95274 4.05623 3.29846 3.58927 2.80857 3.33508C3.02187 2.93601 3.33186 2.58227 3.74138 2.31633L4.45701 1.85149C4.94251 1.53628 5.48859 1.39014 6.02576 1.39836ZM13.9742 1.39836C14.5114 1.39014 15.0574 1.53628 15.5429 1.85149L16.2586 2.31633C16.6681 2.58227 16.9781 2.93601 17.1914 3.33508C16.7015 3.58927 16.0472 4.05623 15.4836 4.91555C14.869 5.85253 14.7191 6.71556 14.7039 7.26399C14.7021 7.32823 14.7062 7.39186 14.714 7.45461C14.1877 7.457 13.6558 7.31393 13.1804 7.00539L12.6179 6.63977L12.4648 6.54055H12.464C11.1704 5.69974 10.8092 3.98923 11.6523 2.70227L11.6531 2.70149L11.6804 2.66008V2.6593C12.208 1.85474 13.0789 1.41207 13.9742 1.39836ZM6.67966 2.22961C6.56437 2.22145 6.44581 2.24642 6.33826 2.30852L5.29841 2.90852C5.01161 3.07412 4.91328 3.44125 5.07888 3.72805C5.24448 4.01485 5.61161 4.11318 5.89841 3.94758L6.93826 3.34758C7.22506 3.18198 7.32339 2.81485 7.15779 2.52805C7.05429 2.3488 6.87182 2.24322 6.67966 2.22961ZM13.3203 2.22961C13.1281 2.24322 12.9457 2.3488 12.8422 2.52805C12.6766 2.81485 12.7749 3.18198 13.0617 3.34758L14.1015 3.94758C14.3883 4.11318 14.7555 4.01485 14.9211 3.72805C15.0867 3.44125 14.9883 3.07412 14.7015 2.90852L13.6617 2.30852C13.5541 2.24642 13.4356 2.22145 13.3203 2.22961ZM2.05544 3.94367C2.15001 3.93026 2.24566 3.94415 2.33044 3.9843H2.33123C2.72151 4.16819 3.32214 4.55465 3.84685 5.35461C4.37147 6.15443 4.48413 6.85669 4.49607 7.28586C4.49887 7.38806 4.46868 7.48582 4.40935 7.57102C4.37312 7.62294 4.32668 7.66905 4.26951 7.70617C3.20676 8.39638 1.81658 8.11847 1.14998 7.10149C0.48333 6.08444 0.787183 4.71203 1.84998 4.0218C1.91401 3.98016 1.98405 3.95398 2.05544 3.94367ZM17.8031 3.94367C17.8493 3.93687 17.8966 3.93706 17.9437 3.94367C18.0154 3.95391 18.0857 3.98003 18.15 4.0218C19.2128 4.71203 19.5166 6.08444 18.85 7.10149C18.1834 8.11847 16.7932 8.39638 15.7304 7.70617C15.6733 7.66905 15.6268 7.62294 15.5906 7.57102C15.5313 7.48582 15.5011 7.38806 15.5039 7.28586C15.5158 6.85669 15.6285 6.15443 16.1531 5.35461C16.6778 4.55465 17.2784 4.16819 17.6687 3.9843H17.6695C17.7118 3.96429 17.7569 3.95048 17.8031 3.94367ZM2.01951 5.4218C1.92048 5.42359 1.82564 5.46204 1.75334 5.52973C1.68104 5.59741 1.63641 5.68951 1.6281 5.78821C1.59915 6.08549 1.66547 6.39728 1.83982 6.66477V6.66555C2.01442 6.93255 2.27361 7.11937 2.55779 7.21242C2.60816 7.23057 2.66166 7.23841 2.71512 7.2355C2.76858 7.23258 2.82091 7.21897 2.86901 7.19546C2.91711 7.17195 2.96 7.13903 2.99514 7.09864C3.03028 7.05825 3.05696 7.01121 3.07359 6.96032C3.09022 6.90944 3.09647 6.85573 3.09196 6.80238C3.08746 6.74903 3.07229 6.69713 3.04736 6.64975C3.02242 6.60237 2.98823 6.56048 2.94682 6.52656C2.9054 6.49264 2.85759 6.46737 2.80623 6.45227C2.68261 6.41179 2.58191 6.33754 2.51013 6.22805C2.43888 6.11874 2.41154 5.99546 2.42419 5.86555C2.43041 5.80907 2.42453 5.75191 2.40693 5.69789C2.38933 5.64386 2.36043 5.5942 2.32214 5.55222C2.28385 5.51023 2.23706 5.47688 2.18488 5.4544C2.13269 5.43191 2.07632 5.4208 2.01951 5.4218ZM17.9687 5.4218C17.9129 5.42245 17.8578 5.43478 17.8071 5.458C17.7563 5.48121 17.7109 5.5148 17.6739 5.5566C17.6369 5.59839 17.609 5.64747 17.5921 5.70068C17.5752 5.75389 17.5697 5.81005 17.5758 5.86555C17.5884 5.99546 17.5611 6.11874 17.4898 6.22805C17.418 6.33754 17.3173 6.41179 17.1937 6.45227C17.1424 6.46737 17.0946 6.49264 17.0531 6.52656C17.0117 6.56048 16.9775 6.60237 16.9526 6.64975C16.9277 6.69713 16.9125 6.74903 16.908 6.80238C16.9035 6.85573 16.9097 6.90944 16.9264 6.96032C16.943 7.01121 16.9697 7.05825 17.0048 7.09864C17.04 7.13903 17.0828 7.17195 17.1309 7.19546C17.179 7.21897 17.2314 7.23258 17.2848 7.2355C17.3383 7.23841 17.3918 7.23057 17.4422 7.21242C17.7263 7.11937 17.9855 6.93255 18.1601 6.66555V6.66477C18.3345 6.39728 18.4008 6.08549 18.3719 5.78821C18.3634 5.68751 18.3171 5.59375 18.2423 5.52578C18.1675 5.45781 18.0698 5.42066 17.9687 5.4218ZM7.22107 7.69602V12.3999C7.22107 12.7362 6.95739 12.9999 6.62107 12.9999H6.22107C5.88475 12.9999 5.62107 12.7362 5.62107 12.3999V8.23977C6.17397 8.18959 6.72271 8.01196 7.22107 7.69602ZM12.7789 7.69602C13.2772 8.01196 13.826 8.18959 14.3789 8.23977V12.3999C14.3789 12.7362 14.1152 12.9999 13.7789 12.9999H13.3789C13.0426 12.9999 12.7789 12.7362 12.7789 12.3999V7.69602Z"
                                            fill="#030504"
                                            fill-opacity="0.8"
                                          />
                                        </svg></span></a>
                                    </li>
                                    <li class="nav-item">
                                      <a
                                        class="nav-link text-muted"
                                        :class="{ 'drop-active': form.headphone_type == 'Over-ear' }"
                                        href="#"
                                        @click.prevent="saveSetting('Over-ear', 'headphone')"
                                      >Over-Ear <span
                                        class="float-end"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M9.99906 0.399902C5.37528 0.399902 1.59906 3.97515 1.59906 8.3999C1.54605 8.39915 1.49343 8.40895 1.44424 8.42871C1.39505 8.44848 1.35028 8.47782 1.31254 8.51504C1.27479 8.55226 1.24481 8.59661 1.22435 8.64551C1.20389 8.69441 1.19336 8.74689 1.19336 8.7999C1.19336 8.85291 1.20389 8.90539 1.22435 8.9543C1.24481 9.0032 1.27479 9.04755 1.31254 9.08477C1.35028 9.12198 1.39505 9.15133 1.44424 9.17109C1.49343 9.19086 1.54605 9.20065 1.59906 9.1999H2.39906C2.45206 9.20065 2.50469 9.19086 2.55387 9.17109C2.60306 9.15133 2.64783 9.12198 2.68558 9.08477C2.72333 9.04755 2.7533 9.0032 2.77376 8.9543C2.79422 8.90539 2.80475 8.85291 2.80475 8.7999C2.80475 8.74689 2.79422 8.69441 2.77376 8.64551C2.7533 8.59661 2.72333 8.55226 2.68558 8.51504C2.64783 8.47782 2.60306 8.44848 2.55387 8.42871C2.50469 8.40895 2.45206 8.39915 2.39906 8.3999C2.39906 8.26095 2.41274 8.12521 2.42093 7.98818C2.47673 8.00825 2.53628 8.01566 2.5953 8.00989C2.65431 8.00411 2.7113 7.98529 2.76214 7.95478C2.81298 7.92428 2.85641 7.88285 2.88928 7.8335C2.92215 7.78415 2.94363 7.72811 2.95218 7.66943C3.08435 6.92305 3.68762 5.67079 4.82952 4.64678C5.97143 3.62276 7.63909 2.7999 9.95843 2.7999C12.2778 2.7999 13.9454 3.62276 15.0873 4.64678C16.2292 5.67079 16.8325 6.92305 16.9647 7.66943C16.9743 7.7355 17.0002 7.79812 17.0402 7.85159C17.0801 7.90506 17.1329 7.94767 17.1935 7.97555C17.2542 8.00343 17.3208 8.01569 17.3874 8.01121C17.454 8.00673 17.5185 7.98565 17.5748 7.9499C17.5846 8.09947 17.5991 8.24803 17.5991 8.3999C17.5461 8.39915 17.4934 8.40895 17.4442 8.42871C17.3951 8.44848 17.3503 8.47782 17.3125 8.51504C17.2748 8.55226 17.2448 8.59661 17.2244 8.64551C17.2039 8.69441 17.1934 8.74689 17.1934 8.7999C17.1934 8.85291 17.2039 8.90539 17.2244 8.9543C17.2448 9.0032 17.2748 9.04755 17.3125 9.08477C17.3503 9.12198 17.3951 9.15133 17.4442 9.17109C17.4934 9.19086 17.5461 9.20065 17.5991 9.1999H18.3991C18.4521 9.20065 18.5047 9.19086 18.5539 9.17109C18.6031 9.15133 18.6478 9.12198 18.6856 9.08477C18.7233 9.04755 18.7533 9.0032 18.7738 8.9543C18.7942 8.90539 18.8048 8.85291 18.8048 8.7999C18.8048 8.74689 18.7942 8.69441 18.7738 8.64551C18.7533 8.59661 18.7233 8.55226 18.6856 8.51504C18.6478 8.47782 18.6031 8.44848 18.5539 8.42871C18.5047 8.40895 18.4521 8.39915 18.3991 8.3999C18.3991 3.97515 14.6228 0.399902 9.99906 0.399902ZM9.99906 1.1999C13.2576 1.1999 16.0138 3.13596 17.0991 5.84834C16.7475 5.24495 16.2586 4.62261 15.6217 4.05146C14.3479 2.90918 12.4691 1.9999 9.95843 1.9999C7.44777 1.9999 5.56894 2.90918 4.29515 4.05146C3.79393 4.50094 3.38775 4.98206 3.06468 5.46084C4.24908 2.95324 6.89748 1.1999 9.99906 1.1999ZM1.59906 9.9999V11.1218H1.62484C1.38611 11.348 1.19906 11.7199 1.19906 12.2288C1.19906 12.6388 1.31376 13.2311 1.50062 13.9608C1.68748 14.6906 1.95104 15.5341 2.2639 16.3421C2.57676 17.1501 2.93618 17.9204 3.33421 18.5147C3.73224 19.1091 4.17147 19.5999 4.79906 19.5999C5.31001 19.5999 5.67754 19.2834 5.86468 18.9585V18.9577C5.88225 18.9273 5.8905 18.9018 5.90374 18.8733C6.06853 18.924 6.25172 18.9476 6.44828 18.9476C6.68365 18.9476 6.91542 18.8809 7.09359 18.7429C7.27176 18.6048 7.38351 18.4112 7.44593 18.2132C7.57078 17.8171 7.54043 17.3775 7.45999 16.8968C7.29913 15.9353 6.89112 14.8076 6.56078 13.9335C6.22974 13.057 5.93316 12.2301 5.57796 11.5851C5.40036 11.2626 5.20855 10.9819 4.96624 10.7655C4.72394 10.5491 4.41189 10.3999 4.07093 10.3999C3.63714 10.3999 3.24635 10.5877 3.02953 10.903C3.02055 10.9161 3.01603 10.9311 3.00765 10.9444C2.85925 10.8725 2.65933 10.7999 2.39906 10.7999V9.9999H1.59906ZM17.5991 9.9999V10.7999C17.3388 10.7999 17.1389 10.8725 16.9905 10.9444C16.9821 10.9311 16.9776 10.9161 16.9686 10.903C16.7518 10.5877 16.361 10.3999 15.9272 10.3999C15.5862 10.3999 15.2742 10.5492 15.0319 10.7655C14.7896 10.9819 14.5977 11.2626 14.4202 11.5851C14.065 12.2301 13.7684 13.057 13.4373 13.9335C13.107 14.8076 12.699 15.9353 12.5381 16.8968C12.4577 17.3775 12.4273 17.8171 12.5522 18.2132C12.6146 18.4112 12.7264 18.6048 12.9045 18.7429C13.0827 18.8809 13.3145 18.9476 13.5498 18.9476C13.7461 18.9476 13.929 18.9238 14.0936 18.8733C14.1069 18.9021 14.1157 18.9277 14.1334 18.9585C14.3206 19.2834 14.6881 19.5999 15.1991 19.5999C15.8266 19.5999 16.2659 19.1091 16.6639 18.5147C17.0619 17.9204 17.4214 17.1501 17.7342 16.3421C18.0471 15.5341 18.3106 14.6906 18.4975 13.9608C18.6844 13.2311 18.7991 12.6388 18.7991 12.2288C18.7991 11.7199 18.612 11.348 18.3733 11.1218H18.3991V9.9999H17.5991ZM4.07093 11.1999C4.19417 11.1999 4.29506 11.2395 4.43265 11.3624C4.57024 11.4853 4.72498 11.6946 4.87718 11.971C5.18159 12.5238 5.47897 13.3336 5.81234 14.2163C6.13839 15.079 6.5303 16.1883 6.67093 17.0288C6.74125 17.4491 6.73656 17.8015 6.68265 17.9726C6.65569 18.0581 6.62743 18.0917 6.60374 18.1101C6.58006 18.1284 6.5473 18.1476 6.44828 18.1476C6.16154 18.1476 6.08366 18.1084 6.01078 18.0437C5.93789 17.9789 5.84083 17.8157 5.70687 17.5194C5.45163 16.9549 4.99967 15.6824 4.61859 14.6577C4.42972 14.1499 4.20674 13.5374 4.01937 13.0015C3.83211 12.4658 3.67696 11.9853 3.64046 11.8272V11.8265C3.58995 11.6062 3.62663 11.4467 3.6889 11.3562C3.75127 11.2654 3.84112 11.1999 4.07093 11.1999ZM15.9272 11.1999C16.157 11.1999 16.2468 11.2654 16.3092 11.3562C16.3716 11.4469 16.4085 11.6064 16.3577 11.8272C16.3212 11.9853 16.166 12.4658 15.9787 13.0015C15.7914 13.5374 15.5684 14.1499 15.3795 14.6577C14.9985 15.6823 14.5463 16.9545 14.2912 17.5194C14.1573 17.8157 14.0602 17.9789 13.9873 18.0437C13.9145 18.1084 13.8366 18.1476 13.5498 18.1476C13.4508 18.1476 13.4181 18.1284 13.3944 18.1101C13.3707 18.0917 13.3424 18.0581 13.3155 17.9726C13.2615 17.8015 13.2569 17.4491 13.3272 17.0288C13.4678 16.1883 13.8597 15.079 14.1858 14.2163C14.5191 13.3336 14.8165 12.5238 15.1209 11.971C15.2731 11.6946 15.4279 11.4853 15.5655 11.3624C15.7031 11.2395 15.8039 11.1999 15.9272 11.1999ZM2.39906 11.5999C2.55657 11.5999 2.61602 11.63 2.70296 11.6788C2.73409 11.6963 2.77966 11.7274 2.82484 11.7562C2.83157 11.8393 2.84163 11.9231 2.86077 12.0062C2.86077 12.0064 2.86077 12.0067 2.86077 12.0069C2.922 12.2724 3.07387 12.722 3.2639 13.2655C3.45393 13.8091 3.67826 14.4249 3.86859 14.9366C4.24591 15.9512 4.6852 17.2008 4.97796 17.8483C5.06307 18.0366 5.14392 18.2073 5.24593 18.3624C5.24212 18.3743 5.23437 18.3912 5.23109 18.4015C5.20528 18.4825 5.19023 18.5265 5.17171 18.5585C5.10839 18.6686 4.94867 18.7999 4.79906 18.7999C4.67664 18.7999 4.34087 18.581 3.99828 18.0694C3.65568 17.5579 3.30885 16.8268 3.00921 16.053C2.70958 15.2792 2.45438 14.4605 2.27562 13.7624C2.09685 13.0643 1.99906 12.4628 1.99906 12.2288C1.99906 11.8436 2.10498 11.7403 2.19203 11.6757C2.27907 11.611 2.41548 11.5999 2.39906 11.5999ZM17.5991 11.5999C17.5826 11.5999 17.719 11.611 17.8061 11.6757C17.8931 11.7403 17.9991 11.8436 17.9991 12.2288C17.9991 12.4628 17.9013 13.0643 17.7225 13.7624C17.5437 14.4605 17.2885 15.2792 16.9889 16.053C16.6893 16.8269 16.3424 17.5579 15.9998 18.0694C15.6572 18.581 15.3215 18.7999 15.1991 18.7999C15.0494 18.7999 14.8897 18.6686 14.8264 18.5585C14.8079 18.5265 14.7928 18.4825 14.767 18.4015C14.7637 18.3912 14.756 18.3743 14.7522 18.3624C14.8542 18.2073 14.935 18.0366 15.0202 17.8483C15.3123 17.2012 15.7522 15.9513 16.1295 14.9366C16.3199 14.4249 16.5442 13.8091 16.7342 13.2655C16.9242 12.722 17.0761 12.2724 17.1373 12.0069C17.1373 12.0067 17.1373 12.0064 17.1373 12.0062C17.1565 11.9231 17.1665 11.8393 17.1733 11.7562C17.2185 11.7274 17.264 11.6963 17.2952 11.6788C17.3821 11.63 17.4415 11.5999 17.5991 11.5999Z"
                                            fill="#030504"
                                            fill-opacity="0.8"
                                          />
                                        </svg></span> </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="px-1">
                          <div id="accordionFlushExample1" class="accordion accordion-flush p-0 m-0">
                            <div class="accordion-item">
                              <h4 id="flush-headingOne" class="accordion-header">
                                <button
                                  class="accordion-button accordion-button-homebar text-muted fs-6 fw-bold py-2 px-3 m-0 collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseOne1"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseOne"
                                >
                                  ANC
                                </button>
                              </h4>
                              <div
                                id="flush-collapseOne1"
                                class="p-0 m-0 accordion-collapse collapse"
                                aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample1"
                              >
                                <div class="accordion-body p-0 m-0">
                                  <ul class="nav flex-column">
                                    <li class="nav-item">
                                      <a
                                        :class="{ 'drop-active': form.anc_type === 'no' || form.anc_type === 'No' }"
                                        class="nav-link text-decoration-none text-muted"
                                        aria-current="page"
                                        href="#"
                                        @click.prevent="saveSetting('no', 'anc')"
                                      >No
                                        <span class="float-end">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                          >
                                            <g clip-path="url(#clip0_143_324)">
                                              <path
                                                d="M5.16262 2.38755C5.14543 2.39067 5.12825 2.39536 5.11262 2.40005C4.92668 2.44224 4.79543 2.60942 4.80012 2.80005V17.2C4.79856 17.3438 4.87356 17.4782 4.99856 17.5516C5.12356 17.6235 5.27668 17.6235 5.40168 17.5516C5.52668 17.4782 5.60168 17.3438 5.60012 17.2V2.80005C5.60481 2.68442 5.55793 2.57349 5.47512 2.49536C5.39075 2.41567 5.27668 2.37661 5.16262 2.38755ZM14.7626 2.38755C14.7454 2.39067 14.7282 2.39536 14.7126 2.40005C14.5267 2.44224 14.3954 2.60942 14.4001 2.80005V17.2C14.3986 17.3438 14.4736 17.4782 14.5986 17.5516C14.7236 17.6235 14.8767 17.6235 15.0017 17.5516C15.1267 17.4782 15.2017 17.3438 15.2001 17.2V2.80005C15.2048 2.68442 15.1579 2.57349 15.0751 2.49536C14.9907 2.41567 14.8767 2.37661 14.7626 2.38755ZM2.76262 5.98755C2.74543 5.99067 2.72825 5.99536 2.71262 6.00005C2.52668 6.04224 2.39543 6.20942 2.40012 6.40005V13.6C2.39856 13.7438 2.47356 13.8782 2.59856 13.9516C2.72356 14.0235 2.87668 14.0235 3.00168 13.9516C3.12668 13.8782 3.20168 13.7438 3.20012 13.6V6.40005C3.20481 6.28442 3.15793 6.17349 3.07512 6.09536C2.99075 6.01567 2.87668 5.97661 2.76262 5.98755ZM17.1626 5.98755C17.1454 5.99067 17.1282 5.99536 17.1126 6.00005C16.9267 6.04224 16.7954 6.20942 16.8001 6.40005V13.6C16.7986 13.7438 16.8736 13.8782 16.9986 13.9516C17.1236 14.0235 17.2767 14.0235 17.4017 13.9516C17.5267 13.8782 17.6017 13.7438 17.6001 13.6V6.40005C17.6048 6.28442 17.5579 6.17349 17.4751 6.09536C17.3907 6.01567 17.2767 5.97661 17.1626 5.98755ZM7.56262 6.38755C7.54543 6.39067 7.52825 6.39536 7.51262 6.40005C7.32668 6.44224 7.19543 6.60942 7.20012 6.80005V10V13.2C7.19856 13.3438 7.27356 13.4782 7.39856 13.5516C7.52356 13.6235 7.67668 13.6235 7.80168 13.5516C7.92668 13.4782 8.00168 13.3438 8.00012 13.2V6.80005C8.00481 6.68442 7.95793 6.57349 7.87512 6.49536C7.79075 6.41567 7.67668 6.37661 7.56262 6.38755ZM12.3626 6.38755C12.3454 6.39067 12.3282 6.39536 12.3126 6.40005C12.1267 6.44224 11.9954 6.60942 12.0001 6.80005V13.2C11.9986 13.3438 12.0736 13.4782 12.1986 13.5516C12.3236 13.6235 12.4767 13.6235 12.6017 13.5516C12.7267 13.4782 12.8017 13.3438 12.8001 13.2V6.80005C12.8048 6.68442 12.7579 6.57349 12.6751 6.49536C12.5907 6.41567 12.4767 6.37661 12.3626 6.38755ZM0.362622 8.38755C0.345434 8.39067 0.328247 8.39536 0.312622 8.40005C0.126684 8.44224 -0.00456587 8.60942 0.000121649 8.80005V11.2C-0.00144085 11.3438 0.0735592 11.4782 0.198559 11.5516C0.323559 11.6235 0.476684 11.6235 0.601684 11.5516C0.726684 11.4782 0.801684 11.3438 0.800122 11.2V8.80005C0.804809 8.68442 0.757934 8.57349 0.675122 8.49536C0.590747 8.41567 0.476684 8.37661 0.362622 8.38755ZM9.96262 8.38755C9.94543 8.39067 9.92825 8.39536 9.91262 8.40005C9.72668 8.44224 9.59543 8.60942 9.60012 8.80005V11.2C9.59856 11.3438 9.67356 11.4782 9.79856 11.5516C9.92356 11.6235 10.0767 11.6235 10.2017 11.5516C10.3267 11.4782 10.4017 11.3438 10.4001 11.2V8.80005C10.4048 8.68442 10.3579 8.57349 10.2751 8.49536C10.1907 8.41567 10.0767 8.37661 9.96262 8.38755ZM19.5626 8.38755C19.5454 8.39067 19.5282 8.39536 19.5126 8.40005C19.3267 8.44224 19.1954 8.60942 19.2001 8.80005V11.2C19.1986 11.3438 19.2736 11.4782 19.3986 11.5516C19.5236 11.6235 19.6767 11.6235 19.8017 11.5516C19.9267 11.4782 20.0017 11.3438 20.0001 11.2V8.80005C20.0048 8.68442 19.9579 8.57349 19.8751 8.49536C19.7907 8.41567 19.6767 8.37661 19.5626 8.38755Z"
                                                fill="#030504"
                                                fill-opacity="0.8"
                                              />
                                              <rect
                                                x="1.82617"
                                                y="0.907189"
                                                width="24.343"
                                                height="1.3"
                                                rx="0.65"
                                                transform="rotate(45 1.82617 0.907189)"
                                                fill="#333534"
                                                stroke="white"
                                                stroke-width="0.5"
                                              />
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_143_324">
                                                <rect width="20" height="20" fill="white" />
                                              </clipPath>
                                            </defs>
                                          </svg></span>
                                      </a>
                                    </li>
                                    <li class="nav-item">
                                      <a
                                        class="nav-link text-muted"
                                        href="#"
                                        :class="{ 'drop-active': form.anc_type === 'yes' || form.anc_type === 'Yes' }"
                                        @click.prevent="saveSetting('yes', 'anc')"
                                      >
                                        Yes <span class="float-end"><svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="16"
                                          viewBox="0 0 20 16"
                                          fill="none"
                                        >
                                          <path
                                            d="M5.16262 0.387549C5.14543 0.390674 5.12825 0.395362 5.11262 0.400049C4.92668 0.442237 4.79543 0.609424 4.80012 0.800049V15.2C4.79856 15.3438 4.87356 15.4782 4.99856 15.5516C5.12356 15.6235 5.27668 15.6235 5.40168 15.5516C5.52668 15.4782 5.60168 15.3438 5.60012 15.2V0.800049C5.60481 0.684424 5.55793 0.573487 5.47512 0.495361C5.39075 0.415674 5.27668 0.376612 5.16262 0.387549ZM14.7626 0.387549C14.7454 0.390674 14.7282 0.395362 14.7126 0.400049C14.5267 0.442237 14.3954 0.609424 14.4001 0.800049V15.2C14.3986 15.3438 14.4736 15.4782 14.5986 15.5516C14.7236 15.6235 14.8767 15.6235 15.0017 15.5516C15.1267 15.4782 15.2017 15.3438 15.2001 15.2V0.800049C15.2048 0.684424 15.1579 0.573487 15.0751 0.495361C14.9907 0.415674 14.8767 0.376612 14.7626 0.387549ZM2.76262 3.98755C2.74543 3.99067 2.72825 3.99536 2.71262 4.00005C2.52668 4.04224 2.39543 4.20942 2.40012 4.40005V11.6C2.39856 11.7438 2.47356 11.8782 2.59856 11.9516C2.72356 12.0235 2.87668 12.0235 3.00168 11.9516C3.12668 11.8782 3.20168 11.7438 3.20012 11.6V4.40005C3.20481 4.28442 3.15793 4.17349 3.07512 4.09536C2.99075 4.01567 2.87668 3.97661 2.76262 3.98755ZM17.1626 3.98755C17.1454 3.99067 17.1282 3.99536 17.1126 4.00005C16.9267 4.04224 16.7954 4.20942 16.8001 4.40005V11.6C16.7986 11.7438 16.8736 11.8782 16.9986 11.9516C17.1236 12.0235 17.2767 12.0235 17.4017 11.9516C17.5267 11.8782 17.6017 11.7438 17.6001 11.6V4.40005C17.6048 4.28442 17.5579 4.17349 17.4751 4.09536C17.3907 4.01567 17.2767 3.97661 17.1626 3.98755ZM7.56262 4.38755C7.54543 4.39067 7.52825 4.39536 7.51262 4.40005C7.32668 4.44224 7.19543 4.60942 7.20012 4.80005V8.00005V11.2C7.19856 11.3438 7.27356 11.4782 7.39856 11.5516C7.52356 11.6235 7.67668 11.6235 7.80168 11.5516C7.92668 11.4782 8.00168 11.3438 8.00012 11.2V4.80005C8.00481 4.68442 7.95793 4.57349 7.87512 4.49536C7.79075 4.41567 7.67668 4.37661 7.56262 4.38755ZM12.3626 4.38755C12.3454 4.39067 12.3282 4.39536 12.3126 4.40005C12.1267 4.44224 11.9954 4.60942 12.0001 4.80005V11.2C11.9986 11.3438 12.0736 11.4782 12.1986 11.5516C12.3236 11.6235 12.4767 11.6235 12.6017 11.5516C12.7267 11.4782 12.8017 11.3438 12.8001 11.2V4.80005C12.8048 4.68442 12.7579 4.57349 12.6751 4.49536C12.5907 4.41567 12.4767 4.37661 12.3626 4.38755ZM0.362622 6.38755C0.345434 6.39067 0.328247 6.39536 0.312622 6.40005C0.126684 6.44224 -0.00456587 6.60942 0.000121649 6.80005V9.20005C-0.00144085 9.3438 0.0735592 9.47817 0.198559 9.55161C0.323559 9.62349 0.476684 9.62349 0.601684 9.55161C0.726684 9.47817 0.801684 9.3438 0.800122 9.20005V6.80005C0.804809 6.68442 0.757934 6.57349 0.675122 6.49536C0.590747 6.41567 0.476684 6.37661 0.362622 6.38755ZM9.96262 6.38755C9.94543 6.39067 9.92825 6.39536 9.91262 6.40005C9.72668 6.44224 9.59543 6.60942 9.60012 6.80005V9.20005C9.59856 9.3438 9.67356 9.47817 9.79856 9.55161C9.92356 9.62349 10.0767 9.62349 10.2017 9.55161C10.3267 9.47817 10.4017 9.3438 10.4001 9.20005V6.80005C10.4048 6.68442 10.3579 6.57349 10.2751 6.49536C10.1907 6.41567 10.0767 6.37661 9.96262 6.38755ZM19.5626 6.38755C19.5454 6.39067 19.5282 6.39536 19.5126 6.40005C19.3267 6.44224 19.1954 6.60942 19.2001 6.80005V9.20005C19.1986 9.3438 19.2736 9.47817 19.3986 9.55161C19.5236 9.62349 19.6767 9.62349 19.8017 9.55161C19.9267 9.47817 20.0017 9.3438 20.0001 9.20005V6.80005C20.0048 6.68442 19.9579 6.57349 19.8751 6.49536C19.7907 6.41567 19.6767 6.37661 19.5626 6.38755Z"
                                            fill="#030504"
                                            fill-opacity="0.8"
                                          />
                                        </svg></span></a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>

                    <li class="nav-item">
                      <a
                        class="nav-link nav-icons"
                        style="padding: 6px 8px;cursor: pointer"
                        data-bs-target="#adaptive-modal"
                        data-bs-toggle="modal"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20" fill="none">
                          <path
                            d="M6.19515 0.864961C6.17452 0.868712 6.1539 0.874336 6.13515 0.879961C5.91202 0.930586 5.75452 1.13121 5.76015 1.35996V18.64C5.75827 18.8125 5.84827 18.9737 5.99827 19.0618C6.14827 19.1481 6.33202 19.1481 6.48202 19.0618C6.63202 18.9737 6.72202 18.8125 6.72015 18.64V1.35996C6.72577 1.22121 6.66952 1.08809 6.57015 0.994336C6.4689 0.898711 6.33202 0.851836 6.19515 0.864961ZM17.7151 0.864961C17.6945 0.868712 17.6739 0.874336 17.6551 0.879961C17.432 0.930586 17.2745 1.13121 17.2801 1.35996V18.64C17.2783 18.8125 17.3683 18.9737 17.5183 19.0618C17.6683 19.1481 17.852 19.1481 18.002 19.0618C18.152 18.9737 18.242 18.8125 18.2401 18.64V1.35996C18.2458 1.22121 18.1895 1.08809 18.0901 0.994336C17.9889 0.898711 17.852 0.851836 17.7151 0.864961ZM3.31515 5.18496C3.29452 5.18871 3.2739 5.19434 3.25515 5.19996C3.03202 5.25059 2.87452 5.45121 2.88015 5.67996V14.32C2.87827 14.4925 2.96827 14.6537 3.11827 14.7418C3.26827 14.8281 3.45202 14.8281 3.60202 14.7418C3.75202 14.6537 3.84202 14.4925 3.84015 14.32V5.67996C3.84577 5.54121 3.78952 5.40809 3.69015 5.31434C3.5889 5.21871 3.45202 5.17184 3.31515 5.18496ZM20.5951 5.18496C20.5745 5.18871 20.5539 5.19434 20.5351 5.19996C20.312 5.25059 20.1545 5.45121 20.1601 5.67996V14.32C20.1583 14.4925 20.2483 14.6537 20.3983 14.7418C20.5483 14.8281 20.732 14.8281 20.882 14.7418C21.032 14.6537 21.122 14.4925 21.1201 14.32V5.67996C21.1258 5.54121 21.0695 5.40809 20.9701 5.31434C20.8689 5.21871 20.732 5.17184 20.5951 5.18496ZM9.07515 5.66496C9.05452 5.66871 9.0339 5.67434 9.01515 5.67996C8.79202 5.73059 8.63452 5.93121 8.64015 6.15996V13.84C8.63827 14.0125 8.72827 14.1737 8.87827 14.2618C9.02827 14.3481 9.21202 14.3481 9.36202 14.2618C9.51202 14.1737 9.60202 14.0125 9.60015 13.84V6.15996C9.60577 6.02121 9.54952 5.88809 9.45015 5.79434C9.3489 5.69871 9.21202 5.65184 9.07515 5.66496ZM14.8351 5.66496C14.8145 5.66871 14.7939 5.67434 14.7751 5.67996C14.552 5.73059 14.3945 5.93121 14.4001 6.15996V13.84C14.3983 14.0125 14.4883 14.1737 14.6383 14.2618C14.7883 14.3481 14.972 14.3481 15.122 14.2618C15.272 14.1737 15.362 14.0125 15.3601 13.84V6.15996C15.3658 6.02121 15.3095 5.88809 15.2101 5.79434C15.1089 5.69871 14.972 5.65184 14.8351 5.66496ZM0.435146 8.06496C0.414521 8.06871 0.393896 8.07434 0.375146 8.07996C0.152021 8.13059 -0.00547904 8.33121 0.000145979 8.55996V11.44C-0.00172902 11.6125 0.0882711 11.7737 0.238271 11.8618C0.388271 11.9481 0.572021 11.9481 0.722021 11.8618C0.872021 11.7737 0.962021 11.6125 0.960146 11.44V8.55996C0.965771 8.42121 0.909521 8.28809 0.810146 8.19434C0.708896 8.09871 0.572021 8.05184 0.435146 8.06496ZM11.9551 8.06496C11.9345 8.06871 11.9139 8.07434 11.8951 8.07996C11.672 8.13059 11.5145 8.33121 11.5201 8.55996V11.44C11.5183 11.6125 11.6083 11.7737 11.7583 11.8618C11.9083 11.9481 12.092 11.9481 12.242 11.8618C12.392 11.7737 12.482 11.6125 12.4801 11.44V8.55996C12.4858 8.42121 12.4295 8.28809 12.3301 8.19434C12.2289 8.09871 12.092 8.05184 11.9551 8.06496ZM23.4751 8.06496C23.4545 8.06871 23.4339 8.07434 23.4151 8.07996C23.192 8.13059 23.0345 8.33121 23.0401 8.55996V11.44C23.0383 11.6125 23.1283 11.7737 23.2783 11.8618C23.4283 11.9481 23.612 11.9481 23.762 11.8618C23.912 11.7737 24.002 11.6125 24.0001 11.44V8.55996C24.0058 8.42121 23.9495 8.28809 23.8501 8.19434C23.7489 8.09871 23.612 8.05184 23.4751 8.06496Z"
                            fill="#030504"
                            fill-opacity="0.4"
                          />
                        </svg>
                      </a>
                    </li>
                    <li class="nav-item mx-1">
                      <nuxt-link :to="localePath('/')" style="padding: 5px 8px" class="nav-link nav-icons   ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M10.6584 0.959961C10.5447 0.960022 10.4346 1.00049 10.3479 1.07415C10.2612 1.14781 10.2035 1.24988 10.185 1.36215L9.71813 4.22059C9.15672 4.3839 8.6214 4.60425 8.11688 4.87871L5.75813 3.19402C5.66578 3.12808 5.55305 3.09698 5.43995 3.10625C5.32685 3.11552 5.2207 3.16455 5.14031 3.24465L3.27281 5.11027C3.19301 5.19013 3.1439 5.29557 3.13413 5.40804C3.12436 5.52052 3.15454 5.63284 3.21938 5.72527L4.87875 8.09902C4.60006 8.60649 4.37482 9.14484 4.2075 9.71152L1.36125 10.185C1.24932 10.2038 1.1477 10.2617 1.07441 10.3484C1.00113 10.4351 0.960925 10.5449 0.960938 10.6584V13.2984C0.960734 13.4112 1.00027 13.5205 1.07262 13.6071C1.14497 13.6937 1.2455 13.752 1.35656 13.7718L4.20469 14.2762C4.3711 14.8419 4.59491 15.3806 4.87406 15.8887L3.19406 18.239C3.12812 18.3314 3.09702 18.4441 3.10629 18.5572C3.11556 18.6703 3.16459 18.7765 3.24469 18.8568L5.11125 20.7243C5.19094 20.804 5.29613 20.8532 5.4084 20.8631C5.52067 20.8731 5.63286 20.8432 5.72531 20.7787L8.10375 19.1137C8.60976 19.3898 9.1464 19.6118 9.70969 19.7765L10.185 22.6387C10.2037 22.7508 10.2615 22.8527 10.3482 22.9261C10.4349 22.9996 10.5448 23.0399 10.6584 23.04H13.2984C13.4114 23.0401 13.5208 23.0005 13.6074 22.9279C13.694 22.8554 13.7522 22.7546 13.7719 22.6434L14.2809 19.77C14.8419 19.6027 15.376 19.3774 15.8794 19.0996L18.2738 20.7796C18.3662 20.8445 18.4785 20.8747 18.591 20.8649C18.7035 20.8551 18.8089 20.806 18.8888 20.7262L20.7553 18.8578C20.8358 18.7772 20.8849 18.6706 20.894 18.5571C20.9031 18.4435 20.8716 18.3305 20.805 18.2381L19.0978 15.8681C19.3708 15.3671 19.5907 14.8362 19.7541 14.279L22.6425 13.7728C22.7537 13.7531 22.8545 13.6949 22.927 13.6083C22.9996 13.5217 23.0392 13.4123 23.0391 13.2993V10.6593C23.039 10.5456 22.9985 10.4355 22.9249 10.3488C22.8512 10.2621 22.7491 10.2044 22.6369 10.1859L19.7531 9.71434C19.5886 9.1578 19.3681 8.62783 19.095 8.12715L20.7787 5.72809C20.8436 5.63566 20.8738 5.52333 20.864 5.41086C20.8542 5.29838 20.8051 5.19295 20.7253 5.11309L18.8578 3.24652C18.7772 3.16608 18.6706 3.11692 18.5571 3.10782C18.4436 3.09872 18.3305 3.13027 18.2381 3.19684L15.8747 4.89652C15.3711 4.61987 14.8367 4.3958 14.2744 4.22996L13.7719 1.35746C13.7524 1.24605 13.6943 1.14508 13.6077 1.07236C13.521 0.99964 13.4115 0.959834 13.2984 0.959961H10.6584ZM11.0672 1.91996H12.8953L13.3734 4.64902C13.3893 4.74055 13.4315 4.8255 13.4947 4.89356C13.5579 4.96163 13.6396 5.00988 13.7297 5.03246C14.4317 5.2074 15.091 5.4847 15.6928 5.84902C15.7733 5.89777 15.8663 5.92181 15.9603 5.91814C16.0543 5.91448 16.1451 5.88327 16.2216 5.8284L18.4678 4.21402L19.7606 5.50684L18.1612 7.7859C18.1078 7.86193 18.0776 7.95182 18.0743 8.04468C18.071 8.13754 18.0947 8.22937 18.1425 8.30902C18.5032 8.90947 18.7768 9.56462 18.9516 10.2628C18.9743 10.3537 19.0232 10.436 19.0922 10.4995C19.1611 10.5629 19.2472 10.6048 19.3397 10.62L22.0791 11.0681V12.8962L19.3341 13.3781C19.2425 13.3943 19.1575 13.4368 19.0896 13.5004C19.0217 13.5639 18.9738 13.6459 18.9516 13.7362C18.7788 14.4335 18.5051 15.0886 18.1444 15.689C18.096 15.7695 18.0722 15.8623 18.076 15.9562C18.0799 16.05 18.1111 16.1406 18.1659 16.2168L19.7878 18.4678L18.495 19.7615L16.2197 18.165C16.1433 18.1114 16.0529 18.0813 15.9597 18.0783C15.8665 18.0754 15.7744 18.0996 15.6947 18.1481C15.0959 18.5124 14.4359 18.791 13.7363 18.9684C13.6466 18.991 13.5653 19.039 13.5023 19.1067C13.4392 19.1744 13.3971 19.2589 13.3809 19.35L12.8963 22.08H11.0653L10.6134 19.3621C10.5981 19.2697 10.556 19.1838 10.4923 19.115C10.4287 19.0462 10.3463 18.9975 10.2553 18.975C9.55289 18.8018 8.89061 18.5249 8.28469 18.1612C8.20514 18.1136 8.11349 18.09 8.02082 18.0933C7.92815 18.0966 7.83843 18.1267 7.7625 18.18L5.505 19.7615L4.21125 18.4659L5.80688 16.2356C5.86141 16.1592 5.89234 16.0684 5.89584 15.9746C5.89933 15.8808 5.87525 15.788 5.82656 15.7078C5.45887 15.1002 5.18079 14.438 5.00531 13.7325C4.98286 13.6426 4.93489 13.5611 4.86719 13.4979C4.79949 13.4347 4.71494 13.3925 4.62375 13.3762L1.92094 12.8962V11.0653L4.62188 10.6162C4.71421 10.6009 4.80005 10.5589 4.86884 10.4955C4.93763 10.432 4.98637 10.3498 5.00906 10.259C5.18605 9.55107 5.464 8.88895 5.83031 8.28277C5.87862 8.20319 5.90274 8.11128 5.89975 8.01823C5.89675 7.92519 5.86676 7.83502 5.81344 7.75871L4.23656 5.50496L5.53125 4.21121L7.76906 5.81059C7.84519 5.86487 7.93552 5.89574 8.02895 5.89941C8.12238 5.90307 8.21485 5.87937 8.295 5.83121C8.89772 5.46922 9.56154 5.19456 10.2647 5.02215C10.3561 4.99965 10.4389 4.95077 10.5027 4.88159C10.5665 4.81242 10.6086 4.726 10.6238 4.63309L11.0672 1.91996ZM12 8.15996C9.88491 8.15996 8.16 9.88487 8.16 12C8.16 14.115 9.88491 15.84 12 15.84C14.1151 15.84 15.84 14.115 15.84 12C15.84 9.88487 14.1151 8.15996 12 8.15996ZM12 9.11996C13.5963 9.11996 14.88 10.4037 14.88 12C14.88 13.5962 13.5963 14.88 12 14.88C10.4037 14.88 9.12 13.5962 9.12 12C9.12 10.4037 10.4037 9.11996 12 9.11996Z"
                            fill="#030504"
                            fill-opacity="0.4"
                          />
                        </svg>
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <nuxt-page key="child" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'pinia'
import { ANC } from '@/stores/interfaces/ANC'
import { HeadsetType } from '@/stores/interfaces/HeadsetType'
import { useUserStore } from '~/stores/user'

export default {
  setup () {
    definePageMeta({
      middleware: 'auth'
    })
    const { t } = useI18n()
    const localePath = useLocalePath()
    definePageMeta({ layout: 'managerLayout' })

        // Access the user store
        const userStore = useUserStore()

        return { t, localePath, userStore }

  },
  data () {
    return {
      adaptiveSounscape: false,
      form: {
        soundscape: '',
        headphone_type: '',
        anc_type: '',
        adaptive_sound_scape: ''
      }

    }
  },
  mounted () {
    this.fetchSettings()
  },
  methods: {
    ...mapActions(useUserStore, ['updateHeadsetType', 'updateANC']),
    fetchSettings () {
      this.$axios.post('/api/fetch-settings').then(({ data }) => {
        if (data.success) {
          // console.log(data)
          this.form = data.setting
          if (data.setting.adaptive_sound_scape === 'yes' || data.setting.adaptive_sound_scape === 'Yes') {
            this.adaptiveSounscape = true
          } else {
            this.adaptiveSounscape = false
          }
        }
      }).catch(() => {
        this.$toast.error('something went wrong while saving...')
      })
    },
    saveSetting (value, type) {
      if (type === 'soundscape') {
        this.form.soundscape = value
      }
      if (type === 'headphone') {
        this.form.headphone_type = value
        if (value === 'In-ear') { this.updateHeadsetType(HeadsetType.InEar) } else { this.updateHeadsetType(HeadsetType.OverEar) }
      }
      if (type === 'anc') {
        this.form.anc_type = value
        if (value === 'yes' || value === 'Yes') { this.updateANC(ANC.Yes) } else { this.updateANC(ANC.No) }
      }
      if (type === 'adaptivesoundscap') {
        if (this.adaptiveSounscape === true) {
          this.form.adaptive_sound_scape = 'no'
        } else {
          this.form.adaptive_sound_scape = 'yes'
        }
      }

      this.$axios.post('/api/update-setting', this.form).then(({ data }) => {
        if (data.success) {
          this.$toast.success(data.message)
          this.form = data.setting
        }
      }).catch(() => {
        this.$toast.error('something went wrong while saving...')
      })
    }
  }
}
</script>

<style scoped>
.list-active {
  border-radius: 10px;
  width: 100% !important;
}

.list-active.router-link-exact-active {
  background-color: #e9c046;
  border-radius: 10px;
  color: white !important;
  width: 100% !important;
}

.list-active:active a {
  color: white !important;
}

.nav-icons.router-link-exact-active {
  fill: white;
  background-color: #e9c046;
}

.nav-icons.router-link-exact-active svg path {
  fill: white;
}

.sidebartext {
  text-indent: 20px;
}

@media only screen and (max-width: 576px) {
  .sidebartext {
    text-indent: 0px;
  }
}

@media only screen and (max-width: 768px) {
  .main-logo svg {
    width: 190px;
  }
}

.nav-icons {
  border-radius: 10px;
  padding: 10px 10px;
}

.nav-icons:focus {
  background-color: #e9c046;
  color: white !important;
  width: 100% !important;
  border-radius: 10px;
  fill: white;
}

.nav-icons:focus svg path {
  fill: white;
}

.fivith-icon.router-link-exact-active {
  content: url('~/assets/image/Vector (4).png');
  background-color: #e9c046;
  border-radius: 5px;
  padding: 10px 10px;
  text-align: center;
}

.accordion-button-homebar::after {
  background-size: 16px;
  background-position-y: 4px;
}

@media only screen and (max-width: 768px) {
  .navbar-logo {
    width: 160px !important;
    padding-bottom: 10px;
  }
}

.drop-active {
  color: white !important;
  background-color: #e9c046;
  border-radius: 10px;
  margin-top: 2px;
}
</style>
