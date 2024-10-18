<template>
  <div class="container">
    <h1 class="text-center my-5">Settings</h1>

    <!-- Impostazioni principali in una griglia di Bootstrap -->
    <div class="row">
      <!-- Card 1: User Settings -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">User Settings</h5>
            <p class="card-text">
              Manage your personal information and account settings.
            </p>
            <NuxtLink to="/settings/user" class="btn btn-primary"
              >Edit Profile</NuxtLink
            >
          </div>
        </div>
      </div>

      <!-- Card 2: Privacy Settings -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Privacy Settings</h5>
            <p class="card-text">
              Control your privacy and security preferences.
            </p>
            <NuxtLink to="/settings/privacy" class="btn btn-primary"
              >Manage Privacy</NuxtLink
            >
          </div>
        </div>
      </div>

      <!-- Card 3: Notification Settings -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Notification Settings</h5>
            <p class="card-text">Configure how you receive notifications.</p>
            <NuxtLink to="/settings/notifications" class="btn btn-primary"
              >Notification Preferences</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Aggiungo una sezione per le impostazioni avanzate -->
    <div class="row mt-5">
      <!-- Card 4: Account Security -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Account Security</h5>
            <p class="card-text">
              Change your password and set up two-factor authentication.
            </p>
            <NuxtLink to="/settings/security" class="btn btn-primary"
              >Manage Security</NuxtLink
            >
          </div>
        </div>
      </div>

      <!-- Card 5: Application Settings -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Application Settings</h5>
            <p class="card-text">
              Configure how the application behaves and set default preferences.
            </p>
            <NuxtLink to="/settings/application" class="btn btn-primary"
              >Manage Application</NuxtLink
            >
          </div>
        </div>
      </div>

      <!-- Card 6: Subscription & Billing -->
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Subscription & Billing</h5>
            <p class="card-text">
              Manage your subscription and billing details.
            </p>
            <NuxtLink to="/settings/subscription" class="btn btn-primary"
              >View Subscription</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
  transition: transform 0.2s ease-in-out; /* Animazione al passaggio del mouse */
}

.card:hover {
  transform: scale(1.05);
}

.card-body {
  text-align: center;
}
</style>
