package zoogle.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zoogle.dao.AdvertDao;
import zoogle.dao.AnimalDao;
import zoogle.model.Advert;
import zoogle.model.AdvertState;
import zoogle.model.Shelter;
import zoogle.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.NoResultException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import zoogle.dao.ShelterDao;
import zoogle.model.Animal;

@Service
public class AdsService {
    private final AdvertDao advertDao;
    private final UserService useServ;
    private final ShelterDao shelDao;
    private final AnimalDao animalDao;
    
    @PersistenceContext
    private EntityManager em;

    @Autowired
    public AdsService(AdvertDao advertDao, UserService userServ, ShelterDao shelterDao,AnimalDao animalDao) {
        this.advertDao = advertDao;
        this.useServ = userServ;
        this.shelDao = shelterDao;
        this.animalDao = animalDao;
    }

    @Transactional
    public List<Advert> getPrintableAdvertsByShelter(Shelter shel) {
        em.flush();
        List<Advert> ads = new ArrayList();

        for (Advert u : advertDao.getAdsByShelter(shel)){
            ads.add(new Advert(u));
        }
        return ads;
    }

    @Transactional
    public void persist(Advert advert) {
        Objects.requireNonNull(advert);
        advertDao.persist(advert);
    }

    @Transactional
    public void delete(Advert advert) {
        Objects.requireNonNull(advert);
        advertDao.remove(advert);
    }

    @Transactional
    public void update(Advert advert) {
        Objects.requireNonNull(advert);
        advertDao.update(advert);
    }

    @Transactional
    public Advert findById(Integer adId) {
        Advert ad = advertDao.find(adId);
        if (ad == null){
            throw new NoResultException("User with this id does not exist");
        }
        Advert ret = new Advert(ad);
        if (ad.getOwner() != null) {
            ret.setOwner(new User(ad.getOwner()));
        } else {
            ret.setShelter(new Shelter(ad.getShelter()));
        }
        return ret;
    }

    @Transactional
    public List<Advert> findAllAds() {
        List<Advert> ads = advertDao.findAll();
        ArrayList<Advert> ret = new ArrayList<>();
        Advert temp;
        for (Advert a : ads){
            if (a.getState() != AdvertState.CLOSED){
                temp = new Advert(a);
                if (a.getOwner() != null){
                    temp.setOwner(new User(a.getOwner()));
                } else{
                    temp.setShelter(new Shelter(a.getShelter()));
                }
                ret.add(temp);
            }
        }
        
        return ret;
    }

    @Transactional
    public List<Advert> findByAdByAShelter(Shelter shelter) {
        return advertDao.findByAdByAShelter(shelter);
    }

    @Transactional
    public List<Advert> findByAdByUser(User user) {
        List<Advert> ads = advertDao.findByAdByUser(user);
        ArrayList<Advert> ret = new ArrayList<>();
        Advert temp;
        for (Advert a : ads){

                temp = new Advert(a);
                if (a.getOwner() != null){
                    temp.setOwner(new User(a.getOwner()));
                } else{
                    temp.setShelter(new Shelter(a.getShelter()));
                }
                ret.add(temp);

        }
        return ret;
    }
    
    @Transactional
    public void submitNewAd(Advert advert) {
        if (advert.getShelter() == null){
            User usr = useServ.getCurrUser();
            advert.setOwner(usr);
        } else {
            int shelId = advert.getShelter().getId();
            Shelter shel = shelDao.find(shelId);
            advert.setShelter(shel);
        }
        animalDao.persist(advert.getAnimal());
        advertDao.persist(advert);
    }
}
