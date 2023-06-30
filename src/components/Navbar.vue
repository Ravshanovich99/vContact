<template>
  <header class="w-full">
    <nav class="w-full flex items-center justify-between">
      <RouterLink to="/">
        <div class="text-2xl">vContact</div>
      </RouterLink>
      <div class="flex">
        <RouterLink to="/profile">Profile</RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  margin: 0 2rem 0 0;
  text-align: end;
  font-size: 1rem;
  padding: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
