// src/app/page.tsx
import HomePage from "./(main)/page";

// The root page of our application will simply render the HomePage
// component that is defined within our (main) route group.
// This keeps our structure clean and consistent.
export default function Page() {
  return <HomePage />;
}