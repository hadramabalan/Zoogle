
package zoogle.restControlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import zoogle.dao.ShelterDao;
import zoogle.dao.ShelterEmployeeDao;
import zoogle.dao.UserDao;
import zoogle.model.Shelter;
import zoogle.model.User;
import zoogle.service.AdsService;
import zoogle.service.ShelterService;
import zoogle.service.UserService;

@RestController
@RequestMapping(value = "admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class  AdminControler {
    
    UserService usrServ;
    private final ShelterService shelterService;
    private final ShelterDao shelterDao;

    @Autowired
    AdminControler(UserService userServ, ShelterService shelterService, ShelterDao shelterDao){
        this.shelterService = shelterService;
        this.usrServ = userServ;
        this.shelterDao = shelterDao;
    }



    @RequestMapping("")
    public String welcome() {
        return "Admin index page. Only logged in users with ADMIN role allowed.";
    }
    
    @RequestMapping(value = "/setUserValid", method = RequestMethod.POST)
    public ResponseEntity<Void> setUserValid(@RequestParam(value="username") String login,
            @RequestParam(value="valid") boolean valid) {
        
//        usrServ.changeValid(login, valid);

        return checkCondition(true);
    }
    
    public ResponseEntity<Void> checkCondition(boolean condition) {
        HttpStatus state = HttpStatus.OK;
        if (!condition){
            state = HttpStatus.BAD_REQUEST;
        }
        final HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(headers, state);
    }

    @RequestMapping(value = "/shelters/requests", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Shelter> getUnapprovedShelters() {
        if(usrServ.getCurrUser().isAdmin()){
            return shelterService.getPrintableUnApprovedShelters();
        }else{
            throw new AccessDeniedException("You don't have permission to view this data");
        }
    }

    @Transactional
    @RequestMapping(value = "/shelters/requests/{shelterId}", method = RequestMethod.PUT)
    public void approveShelter(@PathVariable(value="shelterId") Integer id) {
        Shelter shelter = shelterDao.find(id);
        if(shelter != null){
            shelter.setApproved(true);
            shelterDao.update(shelter);
        }
    }
}
