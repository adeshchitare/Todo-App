from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL="postgresql+psycopg2://neondb_owner:npg_cRF8K4BZXSkl@ep-twilight-bonus-aptq4ayb.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

engine=create_engine(DATABASE_URL)

SessionLocal=sessionmaker(
autocommit=False,
autoflush=False,
bind=engine
)

Base=declarative_base()