import sqlalchemy as db

# from sqlalchemy.orm import Session

Base = db.declarative_base()


class Book(Base):
    __tablename__ = "book"

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=True)

    isbns = db.Column(db.String(255), nullable=True, default="")

    def __repr__(self):
        return f"Book(id={self.id!r}, filename={self.filename!r}, isbns={self.isbns!r})"


def run(db_path=str, objects=list):
    engine = db.create_engine(db_path, echo=True, future=True)

    with db.orm.Session(engine) as session:
        session.add_all(objects)
        session.commit()




