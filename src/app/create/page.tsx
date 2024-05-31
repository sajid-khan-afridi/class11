import { sql } from "@vercel/postgres";

export default async function Cart({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`CREATE TABLE todo (
        id BIGINT NOT NULL,
        text VARCHAR(255),
        completed BOOLEAN
    );`;
  console.log("ROWS=", rows);
  return <>table created</>;
}
