import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SiteinfoService {

  constructor(private http: HttpClient) { }

  // Get site info
  getSiteInfo() {
    return this.http.get(environment.appConfig.apiUrl + '/site/info');
  }

  // Get site id
  getSiteInfoId(site_info_id) {
    return this.http.get(environment.appConfig.apiUrl + '/site/info/' + site_info_id);
  }

  // Add Site Information
  addSiteInfo(site_name, cover_photo, contact_number, email, facebook, instagram,
    twitter, linkedin, address, about_us) {
      const addsiteInfo = {
        site_name: site_name,
        cover_photo: cover_photo,
        contact_number: contact_number,
        email: email,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        linkedin: linkedin,
        address: address,
        about_us: about_us
      };

      return this.http.post(environment.appConfig.apiUrl + '/add/site/info/', addsiteInfo);
  }

  // Update site information
  updateSiteInfo(siteInfo) {
      return this.http.put(environment.appConfig.apiUrl + '/update/site/info', siteInfo);
  }


  // ---------------------------- Icon Service ----------------------------------------------- //

  // Add icon information
  addIcon(addIconDetail) {
    return this.http.post(environment.appConfig.apiUrl + '/add/icon', addIconDetail);
  }

  // Upadte icon information
  updateIcon(addIconDetail) {
    return this.http.put(environment.appConfig.apiUrl + '/update/icon', addIconDetail);
  }

  // Upadte icon information
  deleteIcon(site_icon_id) {
    return this.http.delete(environment.appConfig.apiUrl + '/delete/icon/' + site_icon_id);
  }

  // Upadte icon information
  getIcon() {
    return this.http.get(environment.appConfig.apiUrl + '/icon/get/all');
  }

  // Upadte icon information
  getIconById(site_icon_id) {
    return this.http.get(environment.appConfig.apiUrl + '/icon/id/' + site_icon_id);
  }

  
  // ---------------------------- Icon Service ----------------------------------------------- //

}
