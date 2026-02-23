export async function fetchProducts() {
        // Always fetch the full product catalog from fakestoreapi
        const url = new URL("https://fakestoreapi.com/products");
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
}