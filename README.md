<div align="center">
    <img src="https://res.cloudinary.com/dabwjor9a/image/upload/v1665921544/Avatar_t5qqyr.png" alt="Logo" width="80" height="80">

  <h3 align="center">Remix project for Bdx.io</h3>

  <p align="center">
    A demo project with Remix for managing real estate ads and bookmarking
    <br />
  </p>
</div>

# 🤓 Background

This project was created to present Remix in a very basic way : `routing`, `data-loading` & `mutations`

## Routing

When you place a file in `app/routes` Remix creates a route for that file. You can read about the filename convention [here](https://remix.run/docs/en/v1/api/conventions#file-name-conventions).

> NOTE: The `<Outlet />` component is the key to nested routing it determines where direct children go.

## Data loading

The loading of data is done with the `loader` function that can be found in each route and it goes hand in hand with the `useLoaderData` hook to connect your backend with your frontend

```tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const posts = await getPosts();
  return json({ posts }); // <-- send the data from your backend
}
export default function AdvertisementsPage() {
  const { posts } = useLoaderData<typeof loader>(); // <-- get the data into your UI
  return (
    <div>
      <h3>Posts</h3>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## Mutations

This is one of the main things that makes Remix so special. In Remix, you don't actually need a state management library to handle these things. Remix handles your mutations and ensures your data is up-to-date after mutations are finished doing their mutating.

> With Remix finish the onSubmit with event.preventDefault()

You've got a Form with method="post" and some form elements and when it's submitted, Remix will call your action with the request which you can use to get the form data.

```tsx
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionArgs ) {
  const formData = await request.formData();
  const title = formData.get(“title”);
  const slug = formData.get(“slug”);

  await createPost({ title, slug )};
  return redirect(“/posts”);
}

export default function NewPost() {
  return (
    <Form method=”post”>
        <label>
          Post title :
          <input type=”text” name=”title” />
        </label>
        <label>
          Post slug :
          <input type=”text” name=”slug” />
        </label>
        <button type=”submit”>Create post</button>
    </Form>
  );
}
```

Form submissions are navigations by default.
This process works great for when you're creating a new post and navigating
the user to the page for that post they just created, but it doesn't work
well for something like favoriting a advertisement for example.

This is where `useFetcher()` comes in. With `useFetcher()`, you can create a
mutation that doesn't navigate.

Go to `like-button` component to see its use.

# 💯 Development & Testing

- Initial setup: _If you just pull this project_

  ```sh
  create a .env file and copy .env.example content in it
  ```

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- email : `athena@remix.run`
- password : `athenavousaime`
