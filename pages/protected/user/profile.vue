<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">User Profile</h1>

    <!-- Profilo utente -->
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              class="rounded-circle mb-3"
              width="150"
            />
            <h5 class="card-title">John Doe</h5>
            <p class="card-text">johndoe@example.com</p>
            <button class="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sezione informazioni aggiuntive -->
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card">
          <div class="card-header">Additional Information</div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <strong>Joined:</strong> January 1, 2023
              </li>
              <li class="list-group-item">
                <strong>Location:</strong> New York, USA
              </li>
              <li class="list-group-item">
                <strong>Phone:</strong> +1 234 567 890
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Pulsanti di azione -->
    <div class="row justify-content-center mt-4">
      <div class="col-lg-6 col-md-8 text-center">
        <button class="btn btn-danger me-2">Delete Account</button>
        <button class="btn btn-secondary">Back to Dashboard</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.card-body img {
  object-fit: cover;
}
</style>
