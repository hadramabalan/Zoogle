
package zoogle.restControlers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.NoResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import zoogle.dao.CommentDao;
import zoogle.dao.ShelterDao;
import zoogle.dao.ShelterEmployeeDao;
import zoogle.dao.UserDao;
import zoogle.model.Advert;
import zoogle.model.Animal;
import zoogle.model.Shelter;
import zoogle.model.ShelterEmployee;
import zoogle.model.User;
import zoogle.security.UserDetails;
import zoogle.service.AdsService;
import zoogle.service.ShelterService;
import zoogle.service.UserService;

/**
 * Homepage of Zoogle,
 * Both login and logout are set in spring config.
 * 
 * Login is on page /loginProcess, expected parameters are 'username' and 'password' throught POST method.
 * Logout page is /logout, this will unset session with id given by the cookie attached to this request.
 */
@RestController
@ComponentScan(basePackages = "zoogle")
public class HomeControler {
    @Autowired
    CommentDao dao;
    
    @Autowired
    ShelterEmployeeDao shelEmpDao;
    
    private final UserService usrServ;
    private final UserDao usrDao;
    private final ShelterService shelServ;
    private final ShelterDao shelDao;
    private final AdsService adsService;
    
    @Autowired
    public HomeControler(UserService service, UserDao dao, ShelterService shelSer, 
            ShelterDao shelterDao, AdsService advServ){
        usrServ = service;
        usrDao = dao;
        shelServ = shelSer;
        shelDao = shelterDao;
        adsService = advServ;
    }
    
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Void> register(
            @RequestParam(value="username") String login, 
            @RequestParam(value="password") String pass,
            @RequestParam(value="firstName") String firstName,
            @RequestParam(value="lastName") String lastName,
            @RequestParam(value="mail") String mail,
            @RequestParam(value="phone") String phone) {
        
        User user = usrDao.findByUsername(login);
        if (user != null){
            throw new UsernameNotFoundException("User with this id already exists");
        }
        
        usrServ.registerNewUser(login, pass, firstName, lastName, mail, phone);

        HttpStatus state = HttpStatus.OK;
        final HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(headers, state);
    }
    
    @RequestMapping(value = "shelters", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Shelter> getShelters() {
        return shelServ.getPrintableShelters();
    }
    
    @RequestMapping(value = "shelters/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Shelter getShelter(@PathVariable(value="id") Integer id) {
        Shelter shel = shelDao.find(id);
        if (shel == null){
            throw new NoResultException("Shelter with this id does not exist");
        }
        return new Shelter(shel);
    }
    
    @RequestMapping(value = "ads", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Advert> getAds() {
        return adsService.findAllAds();
    }
    
    @RequestMapping(value = "ads/{id}", method = GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Advert getAdById(@PathVariable("id") Integer id) {
        return adsService.findById(id);
    }

    @RequestMapping("/home")
    public String welcome() {
        ShelterEmployee shemp = shelEmpDao.find(7);
        return "Hello Zoogle! " + shemp.getShelter().getId();
//        User user = usrDao.find(3);
//        ArrayList<Shelter> shels = new ArrayList<>();
//        for (Shelter s: user.getShelters()){
//            shels.add(new Shelter(s));
//        }
//        return shels;
    }
    
//    @RequestMapping(value = "/home", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public Map< String, Object > testComposite() {
//        Map< String, Object > ret = new HashMap<>();
//        User p1 = new User();
//        Animal a1 = new Animal();
//        Animal a2 = new Animal();
//        
//        p1.setFirstname("Lukas");
//        a1.setName("Bruno");
//        a2.setName("Lucy");
//        ArrayList<Animal> anim = new ArrayList<>();
//        anim.add(a1);
//        anim.add(a2);
//        
//        ret.put("oneUser", p1);
//        ret.put("animals", anim);
//        return ret;
//    }
}
