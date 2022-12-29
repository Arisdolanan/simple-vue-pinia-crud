<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore, useGlobalStore } from "@/stores";
import QrcodeVue from "qrcode.vue";
// load component
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";

// import { RouterLink } from "vue-router";
// const router = useRouter();

// const props = defineProps({
//   title: {
//     type: String,
//     required: true,
//   }
// })

const studentStores = useStudentStore(); // get pinia stores
const { isOpenModal } = storeToRefs(useGlobalStore()); // get
const { setOpenModal } = useGlobalStore(); // set
const { getStudentById, addStudent, updateStudent, deleteStudent } =
  useStudentStore(); // set

studentStores.getStudent();

// reactive state
const itemId = ref(0);
const name = ref("");
const nim = ref("");
const email = ref("");
const gender = ref("");
const address = ref("");
const choose = ref(0);

// example watch the hooks from this component
onBeforeMount(() => console.log("from component", "onBeforeMount"));
onMounted(() => console.log("from component", "onMounted"));
onBeforeUpdate(() => console.log("from component", "onBeforeUpdate"));
onUpdated(() => {
  console.log("from component", "onUpdated");
});
onBeforeUnmount(() => console.log("from component", "onBeforeUnmount"));
onUnmounted(() => console.log("from component", "onUnmounted"));
// watch(connected, (val) => {
//     if (val) {
//         router.push({ name: 'home' });
//     }
// });

// function methods
const toggleModal = (data, id) => {
  switch (data) {
    case 0:
      choose.value = 0;
      clearForm();
      break;
    case 1:
      choose.value = 1;
      itemId.value = id;
      getStudentByIdAPI(id);
      break;
    case 2:
      choose.value = 2;
      itemId.value = id;
      break;
  }
  setOpenModal(true);
};

const getStudentByIdAPI = async (id) => {
  const data = await getStudentById(id);
  name.value = data.name;
  nim.value = data.nim;
  email.value = data.email;
  gender.value = data.gender;
  address.value = data.address;
};

const addConfirm = async () => {
  const data = {
    id: itemId.value,
    name: name.value,
    nim: nim.value,
    email: email.value,
    gender: gender.value,
    address: address.value,
  };
  await addStudent(data);
  setOpenModal(false);
};

const updateConfirm = async () => {
  const data = {
    id: itemId.value,
    name: name.value,
    nim: nim.value,
    email: email.value,
    gender: gender.value,
    address: address.value,
  };
  await updateStudent(data);
  setOpenModal(false);
};

const deleteConfirm = async () => {
  await deleteStudent(itemId.value);
  setOpenModal(false);
};

const clearForm = () => {
  name.value = "";
  nim.value = "";
  email.value = "";
  gender.value = "";
  address.value = "";
  console.log("clear form");
};
</script>

<template>
  <div class="student">
    <!-- <RouterLink :to="`/`">Home</RouterLink> -->
    <button @click="toggleModal(0, null)">Add Data</button>
    <transition name="modal">
      <Modal v-if="isOpenModal" @close="isOpenModal = false">
        <template v-slot:header>
          <h3 v-if="choose == 0">Add Data Modal</h3>
          <h3 v-if="choose == 1">Edit Data Modal {{ itemId }}</h3>
        </template>
        <template v-slot:footer>
          <!--  add data -->
          <div v-if="choose == 0">
            <label>Name: </label>
            <input type="text" id="name" name="name" v-model="name" />
            <label>NIM: </label>
            <input type="text" id="nim" name="nim" v-model="nim" />
            <label>Email: </label>
            <input type="email" id="email" name="email" v-model="email" />
            <label>Gender: </label>
            <input type="text" id="gender" name="gender" v-model="gender" />
            <label>Address: </label>
            <input type="text" id="address" name="address" v-model="address" />
            <button class="modal-default-button" @click="addConfirm">OK</button>
          </div>
          <!--  add data -->

          <!--  edit data -->
          <div v-if="choose == 1">
            <label>Name: </label>
            <input type="text" id="name" name="name" v-model="name" />
            <label>NIM: </label>
            <input type="text" id="nim" name="nim" v-model="nim" />
            <label>Email: </label>
            <input type="email" id="email" name="email" v-model="email" />
            <label>Gender: </label>
            <input type="text" id="gender" name="gender" v-model="gender" />
            <label>Address: </label>
            <input type="text" id="address" name="address" v-model="address" />
            <button class="modal-default-button" @click="updateConfirm">
              OK
            </button>
          </div>
          <!--  edit data -->

          <div v-if="choose == 2">
            <p className="content">
              Apakah anda yakin ingin menghapus item ini {{ itemId }} ?
            </p>
            <button class="modal-default-button" @click="deleteConfirm">
              OK
            </button>
          </div>

          <button class="modal-default-button" @click="isOpenModal = false">
            Close
          </button>
        </template>
      </Modal>
    </transition>
    <div class="row">
      <div v-for="user in studentStores.students" :key="user.id">
        <div className="card">
          <div className="container">
            <p>name: {{ user.name }}</p>
            <p>nim: {{ user.nim }}</p>
            <p>email: {{ user.email }}</p>
            <p>gender: {{ user.gender }}</p>
            <p>address: {{ user.address }}</p>
            <qrcode-vue :value="user.nim" level="H" />
            <div className="row">
              <button @click="toggleModal(1, user.id)">Edit</button>
              <button @click="toggleModal(2, user.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!studentStores.students.length > 0">
        <Loading />
      </div>
    </div>
  </div>
</template>

<style></style>
