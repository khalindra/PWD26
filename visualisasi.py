import pandas as pd
import matplotlib.pyplot as plt
import mysql.connector

# Koneksi ke database MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="h1101251070"
)

# Mengambil data mahasiswa per jurusan
query = """
SELECT jurusan,
       COUNT(*) AS jumlah_mhs,
       ROUND(AVG(ipk), 2) AS rata_ipk
FROM mahasiswa
GROUP BY jurusan
ORDER BY jumlah_mhs DESC;
"""

df = pd.read_sql(query, conn)
conn.close()

print(df)

# Grafik batang
plt.figure(figsize=(8, 5))
plt.bar(df["jurusan"], df["jumlah_mhs"])
plt.title("Jumlah Mahasiswa per Jurusan")
plt.xlabel("Jurusan")
plt.ylabel("Jumlah Mahasiswa")
plt.tight_layout()
plt.savefig("grafik_jurusan.png")
plt.show()

# Grafik lingkaran
plt.figure(figsize=(6, 6))
plt.pie(
    df["jumlah_mhs"],
    labels=df["jurusan"],
    autopct="%1.1f%%"
)
plt.title("Proporsi Mahasiswa per Jurusan")
plt.savefig("pie_jurusan.png")
plt.show()
