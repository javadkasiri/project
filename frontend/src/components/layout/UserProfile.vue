<template>
  
    <div class="profile-card">
      <button class="close-btn" @click="$emit('close')">✖</button>
      <h3>User Profile</h3>

      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Username:</strong> {{ username }}</p>

      <p>
        <strong>Name:</strong>
        <template v-if="editingField === 'name'">
          <input v-model="updatedValue" />
          <span class="material-symbols-outlined edit-icon" @click="saveField"
            >check</span
          >
        </template>
        <template v-else>
          {{ name }}
          <span
            class="material-symbols-outlined edit-icon"
            @click="editField('name', name)"
            >edit</span
          >
        </template>
      </p>

      <p>
        <strong>Phone:</strong>
        <template v-if="editingField === 'phone'">
          <input v-model="updatedValue" />
          <span class="material-symbols-outlined edit-icon" @click="saveField"
            >check</span
          >
        </template>
        <template v-else>
          {{ phone }}
          <span
            class="material-symbols-outlined edit-icon"
            @click="editField('phone', phone)"
            >edit</span
          >
        </template>
      </p>

      <p>
        <strong>Role:</strong>
        <template v-if="editingField === 'role'">
          <input v-model="updatedValue" />
          <span class="material-symbols-outlined edit-icon" @click="saveField"
            >check</span
          >
        </template>
        <template v-else>
          {{ role }}
          <span
            class="material-symbols-outlined edit-icon"
            @click="editField('role', role)"
            >edit</span
          >
        </template>
      </p>
    </div>
</template>

<script>
import { getemailFromServer } from "@/utils/auth";

export default {
  data() {
    return {
      email: "",
      username: "",
      name: "",
      phone: "",
      role: "",
      editingField: null, // نام فیلدی که در حال ویرایش است
      updatedValue: "", // مقدار جدید فیلد در حال ویرایش
    };
  },
  async created() {
    try {
      this.email = await getemailFromServer();
      if (!this.email) return;

      const res = await fetch(
        "http://localhost:3000/api/dumdb/vueapp/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "get",
            filter: { email: this.email },
          }),
        }
      );

      const result = await res.json();
      if (res.ok && result.result.length > 0) {
        const profile = result.result[0];
        this.username = profile.username || "";
        this.name = profile.name || "";
        this.phone = profile.phone || "";
        this.role = profile.role || "";
      }
    } catch (err) {
      console.error("Error loading profile data:", err);
    }
  },
  methods: {
    editField(field) {
      this.editingField = field;
      this.updatedValue = this[field]; // مقدار فعلی فیلد را داخل input بریز
    },
    async saveField() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/dumdb/vueapp/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "edit",
              filter: { email: this.email },
              data: { [this.editingField]: this.updatedValue },
            }),
          }
        );

        const result = await res.json();

        if (res.ok) {
          this[this.editingField] = this.updatedValue;
          this.editingField = null;
          this.updatedValue = "";
        } else {
          console.warn("Failed to update profile:", result);
        }
      } catch (error) {
        console.error("Error while saving profile field:", error);
      }
    },
  },
};
</script>

<style scoped>
.profile-card {
  position: relative;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 500px;
  max-width: 500px;
  text-align: left;
}
h3 {
  text-align: center;
  color: #087944;
  margin-bottom: 24px;
  font-weight: bold;
}

.profile-card p {
  margin: 16px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
}

.profile-card input {
  margin-left: 10px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

strong {
  color: #2c3e50;
  min-width: 100px;
  display: inline-block;
}

.material-symbols-outlined.edit-icon {
  font-size: 18px;
  color: #087944;
  cursor: pointer;
  margin-left: 8px;
  transition: scale 0.2s ease;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 15px;
  color: #888;
  cursor: pointer;
}

.close-btn:hover {
  color: #e74c3c;
}
</style>
