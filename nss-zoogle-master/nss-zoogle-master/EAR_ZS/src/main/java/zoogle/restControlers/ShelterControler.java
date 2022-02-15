/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoogle.restControlers;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.NoResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import zoogle.dao.AdvertDao;
import zoogle.dao.ShelterDao;
import zoogle.dao.ShelterEmployeeDao;
import zoogle.dao.UserDao;
import zoogle.model.Advert;
import zoogle.model.EmployeeState;
import zoogle.model.Shelter;
import zoogle.model.ShelterEmployee;
import zoogle.model.User;
import zoogle.security.UserDetails;
import zoogle.service.AdsService;
import zoogle.service.ShelterEmployeeService;
import zoogle.service.ShelterService;
import zoogle.service.UserService;

/**
 *
 * @author Hp
 */
@RestController
@PreAuthorize("hasRole('ROLE_USER')")
@RequestMapping(value = "shelters")
public class ShelterControler {
    
    private final ShelterService shelServ;
    private final ShelterDao shelDao;
    private final ShelterEmployeeDao shelEmpDao;
    private final ShelterEmployeeService shelempServ;
    private final AdsService adServ;
    private final UserService usrServ;
    private final UserDao usrDao;
    
    @Autowired
    ShelterControler(ShelterService service, ShelterDao dao, AdsService advertServ, UserService userServ,
            ShelterEmployeeDao shempDao, UserDao userDao, ShelterEmployeeService shempServ){
        shelServ = service;
        shelDao = dao;
        adServ = advertServ;
        usrServ = userServ;
        shelEmpDao = shempDao;
        usrDao = userDao;
        shelempServ = shempServ;
    }
    
    @RequestMapping(value = "", method = RequestMethod.POST)
    public String register(@RequestBody Shelter shel) {
        return shelServ.submitNewShelterRequest(shel);
    }
    
    @RequestMapping(value = "/{id}/ads", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Advert> getSheltersAdsById(@PathVariable(value="id") Integer id) {
        Shelter shel = shelDao.find(id);
        if (shel == null || !shel.isActive()){
            throw new NoResultException("Shelter with this id does not exist");
        }
        
        return adServ.getPrintableAdvertsByShelter(shel);
    }
    
    @RequestMapping(value = "/employed", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Shelter> getCurrUserShelters() {
        User user = usrServ.getCurrUser();
        ArrayList<Shelter> shels = new ArrayList<>();
        for (ShelterEmployee e: user.getShelterRecords()){
            if (e.getShelter().isActive()){
                shels.add(new Shelter(e.getShelter()));
            }
        }
        return shels;
    }
        
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteShelter(@PathVariable(value="id") Integer id) {
        Shelter shel = shelDao.find(id);
        if (shel == null || !shel.isActive()){
            throw new NoResultException("Shelter with this id does not exist");
        }
        shel.setActive(false);
        shelDao.update(shel);
    }
    
    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void editShelter(
            @PathVariable(value="id") Integer id,
            @RequestBody Shelter reqShel) {
        Shelter shel = shelDao.find(id);
        if (shel == null || !shel.isActive()){
            throw new NoResultException("Shelter with this id does not exist");
        }
        
        if (reqShel.getName() == null ){
            reqShel.setName(shel.getName());
        }
        if (reqShel.getMail() == null ){
            reqShel.setMail(shel.getMail());
        }
        if (reqShel.getPhone() == null ){
            reqShel.setPhone(shel.getPhone());
        }
        if (reqShel.getCountry() == null ){
            reqShel.setCountry(shel.getCountry());
        }
        if (reqShel.getCity() == null ){
            reqShel.setCity(shel.getCity());
        }
        if (reqShel.getStreet() == null ){
            reqShel.setStreet(shel.getStreet());
        }
        if (reqShel.getZip() == null ){
            reqShel.setZip(shel.getZip());
        }
        
        reqShel.setApproved(shel.isApproved());
        reqShel.setActive(shel.isActive());
        reqShel.setId(id);
        shelDao.update(reqShel);
    }
    
    @Transactional
    @RequestMapping(value = "/{shelterId}/employees", method = RequestMethod.POST)
    public String newJoinShelterRequest(@PathVariable(value="shelterId") Integer id) {
        Shelter shel = shelDao.find(id);
        if (shel == null || !shel.isActive()){
            throw new NoResultException("Shelter with this id does not exist");
        }
        User user = usrServ.getCurrUser();
        ShelterEmployee origShelEmp = shelEmpDao.findByUsernameAndShelter(user,shel);
        if (origShelEmp != null){
            throw new NoResultException("This relation already exists");
        }

        ShelterEmployee shemp = new ShelterEmployee(user,shel, EmployeeState.WAITING);
        shelEmpDao.persist(shemp);

        return user.getLogin();
    }


    @RequestMapping(value = "/{shelterId}/employees/requests", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ShelterEmployee> getJoinShelterRequests(@PathVariable(value="shelterId") Integer id) {
        Shelter shel = shelDao.find(id);
        return shelempServ.getRequests(shel);
    }

    @Transactional
    @RequestMapping(value = "/{shelterId}/employees/{userId}/{approved}", method = RequestMethod.PUT)
    public void approveJoinShelterRequest(
            @PathVariable(value="shelterId") Integer shelId,
            @PathVariable(value="userId") Integer userId,
            @PathVariable(value="approved") boolean approved) {
        Shelter shel = shelDao.find(shelId);
        if (shel == null || !shel.isActive()){
            throw new NoResultException("Shelter with this id does not exist");
        }
        User user = usrDao.find(userId);
        if (user == null){
            throw new UsernameNotFoundException("User with this id does not exist");
        }
        
        ShelterEmployee shemp = shelEmpDao.findByUsernameAndShelter(user,shel);
        if (shemp == null){
            throw new NoResultException("This relation doesnt exist");
        }
        
        EmployeeState state;
        if (approved){
            state = EmployeeState.ACTIVE;
        } else{
            state = EmployeeState.DENIED;
        }
        shemp.setState(state);
        shelEmpDao.update(shemp); 
    }
    
}
