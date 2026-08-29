import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-8xl font-extrabold text-gradient-cyan">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-white">
        Page not found
      </h1>
      <p className="mt-3 text-mist">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get
        you back to the good stuff.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go Home</Button>
        <Button variant="secondary" href="/shop">
          Explore Products
        </Button>
      </div>
    </div>
  );
}
