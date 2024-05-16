import os
from pathlib import Path
import psycopg2
from dotenv import load_dotenv

# env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, '.env'))

DB_PASSWORD=os.getenv("PGPASSWORD")
DB_NAME=os.getenv("PGDATABASE")
DB_USER=os.getenv("PGUSER")
DB_HOST=os.getenv("PGHOST")
DB_PORT=os.getenv("PGPORT")

SQL_STATEMENT_ETH = "SELECT * FROM crypto_walletaddress WHERE eth_deposit_pub = '{}';"
SQL_STATEMENT_BTC = "SELECT * FROM crypto_walletaddress WHERE btc_deposit_wallet_address = '{}';"

def connect():
    """ Connect to the PostgreSQL database server """
    conn = psycopg2.connect(database=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
    print("Database Connection is established successfully.")
    return conn
        
def get_db_cursor(conn=None):
    if not conn or conn.closed:
        conn = connect()
    return conn.cursor()

def get_mybiz_reception_address_eth(eth_deposit_pub):
    global cur
    if not cur or cur.closed:
        cur = get_db_cursor()
    cur.execute(SQL_STATEMENT_ETH.format(eth_deposit_pub))
    rows = cur.fetchall()
    if rows:
        return rows[0][3]

def get_mybiz_reception_address_btc(btc_deposit_wallet_address):
    global cur
    if not cur or cur.closed:
        cur = get_db_cursor()
    cur.execute(SQL_STATEMENT_BTC.format(btc_deposit_wallet_address))
    rows = cur.fetchall()
    if rows:
        return rows[0][3]
        
def check_fields_customer():
    global cur
    if not cur or cur.closed:
        cur = get_db_cursor()
    sql = "SELECT * FROM crypto_walletaddress;"
    cur.execute(sql)
    rows = cur.fetchall()
    if rows:
        return rows[0]
        
cur = get_db_cursor()

if __name__ == "__main__":
    print(get_mybiz_reception_address_eth("0x8cbdfa9ac144177b71128423c6c3f2faafcad410"))
    print(get_mybiz_reception_address_btc("1HD44yd4A7fFLS5DdBCRAo7bafBRBQGykb"))
    # print(check_fields_customer())
    # print(check_fields_vendor())
    
    
    