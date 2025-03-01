import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
    max: 20, // 最大连接数
    idle_timeout: 30, // 空闲连接超时(秒)
    connect_timeout: 10, // 连接超时(秒)
    onnotice: (msg) => console.log(msg), // 处理通知
    ssl: false, // SSL配置
});

async function listInvoices() {
    const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

    return data;
}

export async function GET() {
    try {
        return Response.json(await listInvoices());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
