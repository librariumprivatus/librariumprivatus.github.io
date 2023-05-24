import bibliotekalib
import biblioteka_conf

if __name__ == '__main__':
    bibl = bibliotekalib.Biblioteka(path=biblioteka_conf.BIBLIOTEKA_ROOT)
    bibl.make_pocketsync(path=biblioteka_conf.POCKETSYNC_ROOT)

