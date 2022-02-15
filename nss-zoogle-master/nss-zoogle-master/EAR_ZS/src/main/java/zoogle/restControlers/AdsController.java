package zoogle.restControlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import zoogle.dao.AdvertDao;
import zoogle.model.Advert;
import zoogle.model.Shelter;
import zoogle.model.User;
import zoogle.service.AdsService;
import zoogle.utils.RestUtils;

import javax.persistence.NoResultException;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;

import static org.springframework.web.bind.annotation.RequestMethod.*;
import zoogle.dao.AnimalDao;
import zoogle.model.AdvertState;
import zoogle.model.Animal;
import zoogle.service.UserService;

@RestController
@PreAuthorize("hasRole('ROLE_USER')")
@RequestMapping("ads")
public class AdsController {
    private static final Logger LOG = LoggerFactory.getLogger(AdsController.class);
    private final AdsService adsService;
    private final AdvertDao adsDao;
    private final AnimalDao animDao;
    private final UserService usrServ;
    
    @Autowired
    public AdsController(AdsService adsService, AdvertDao advertDao, AnimalDao animalDao, UserService userServ) {
        this.adsService = adsService;
        this.adsDao = advertDao;
        this.animDao = animalDao;
        this.usrServ = userServ;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void createAd(@RequestBody Advert advert) {
        adsService.submitNewAd(advert);
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void removeAd(@PathVariable("id") Integer id) {
        final Advert toRemove = adsService.findById(id);
        
        if (toRemove == null || toRemove.getState() == AdvertState.CLOSED){
            throw new NoResultException("Advert with this id does not exist");
        }
        toRemove.setState(AdvertState.CLOSED);
        adsDao.update(toRemove);
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void editAd(@PathVariable("id") Integer id, 
            @RequestBody Advert advert) {
        
        Advert origAd = adsDao.find(id);
        if (origAd == null){
            throw new NoResultException("Advert with this id does not exist");
        }
        Animal anim = advert.getAnimal();
        anim.setId(origAd.getAnimal().getId());
        animDao.update(anim);

        if (advert.getDescription() == null) {
            advert.setDateCreated(origAd.getDateCreated());
        }
        if (advert.getDescription() == null) {
            advert.setDescription(origAd.getDescription());
        }
        if (advert.getState() == null) {
            advert.setState(origAd.getState());
        }
        if (advert.getAnimal() == null) {
            advert.setAnimal(origAd.getAnimal());
        }
        advert.setOwner(origAd.getOwner());
        advert.setShelter(origAd.getShelter());
        advert.setId(id);
        advert.setDateCreated(origAd.getDateCreated());
        
        adsService.update(advert);
    }

    @RequestMapping(value = "/owned", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Advert> getOwnedAds() {
        User user = usrServ.getCurrUser();
        return adsService.findByAdByUser(user);
    }


}
