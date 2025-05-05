from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Meta_Dashboard(models.Model):
    Pending_id = models.BigAutoField(primary_key=True,unique=True)
    scan_id = models.IntegerField(blank=True,null=True)
    Ip = models.GenericIPAddressField()
    Send_status = models.BooleanField(default=False)
    Meta_id = models.IntegerField(null=True,blank=True)
    Meta_start_time = models.DateTimeField(null=True,blank=True)
    Meta_stop_time = models.DateTimeField(null=True,blank=True)
    Meta_scan_status=models.CharField(max_length=128,blank=True,null=True)

    def __int__(self):
        return self.Pending_id
    
    class Meta:
        ordering=["Pending_id"]


class Nmap_Core_Dashboard(models.Model):
    Scan_id=models.BigAutoField(primary_key=True,unique=True)
    ip=models.GenericIPAddressField()
    ip_type=models.CharField(max_length=128,blank=True,null=True)
    pt_start_time=models.DateTimeField(blank=True,null=True)
    pt_stop_time=models.DateTimeField(blank=True,null=True)
    etc=models.CharField(max_length=128,blank=True,null=True)
    current_status=models.CharField(max_length=128,blank=True,null=True)

    class Meta:
        ordering=['Scan_id']
    
    def __int__(self):
        return self.Scan_id

       
class Metasploit_details(models.Model):
    Meta_on_off=models.BooleanField(default=True,help_text="Is the Metasploit up or not")

    def meta_save(self,*args,**kwargs):
        self.pk=1
        super().meta_save(*args,**kwargs)

# class Pending_Meta(models.Model):
#     Pending_id = models.BigAutoField(primary_key=True,unique=True)
#     scan_id = models.ForeignKey(Scan, on_delete=models.RESTRICT)
#     Ip = models.GenericIPAddressField()
#     Send_status = models.BooleanField(default=False)
#     Meta_id = models.IntegerField(null=True,blank=True)
#     Meta_start_time = models.DateTimeField(null=True,blank=True)
#     Meta_stop_time = models.DateTimeField(null=True,blank=True)
#     Meta_scan_status = models.CharField(
#         max_length=30,
#         choices=(
#             ("-1", "Meta Scan Aborted"),
#             ("0", "Pending Meta Scan"),
#             ("1", "Sent To Meta"),
#             ("2", "Meta Scanning"),
#             ("3", "Meta Completed ")
#         ),
#         default="0"
#     )
#     class Meta:
#         ordering = ["Pending_id"]

#     def __int__(self):
#         return self.Pending_id

class Meta_Scan_Table(models.Model):
    Scan_id =  models.IntegerField(primary_key = True)
    name = models.CharField(max_length=200,null=True,blank=True)
    boundary = models.TextField(null=True,blank=True)
    description = models.CharField(max_length=200,blank=True,null=True)
    owner_id = models.IntegerField(null=True,blank=True)
    limit_to_network = models.BooleanField(null=True,blank=True)
    created_at = models.DateTimeField(null=True,blank=True)
    updated_at = models.DateTimeField(null=True,blank=True)
    import_fingerprint = models.BooleanField(null=True,blank=True)
    host_count = models.IntegerField(null=True,blank=True)

    class Meta:
        ordering = ["Scan_id"]

    def __int__(self):
        return self.Scan_id

class Meta_Host_Table(models.Model):
    Host_id = models.IntegerField(primary_key = True)
    scan_id = models.ForeignKey(Meta_Scan_Table,on_delete=models.CASCADE)
    created_at = models.DateTimeField(null=True,blank=True)
    address= models.GenericIPAddressField(blank=True,null=True)
    mac= models.CharField(max_length=200,null=True,blank=True)
    comm= models.CharField(max_length=200,null=True,blank=True)
    name= models.CharField(max_length=200,null=True,blank=True)
    state= models.CharField(max_length=200,null=True,blank=True)
    os_name= models.CharField(max_length=200,null=True,blank=True)
    os_flavor= models.CharField(max_length=200,null=True,blank=True)
    os_sp= models.CharField(max_length=200,null=True,blank=True)
    os_lang= models.CharField(max_length=200,null=True,blank=True)
    arch= models.CharField(max_length=200,null=True,blank=True)
    workspace_id= models.IntegerField(null=True,blank=True)
    updated_at= models.DateTimeField(null=True,blank=True)
    purpose= models.CharField(max_length=200,null=True,blank=True)
    info= models.TextField(null=True,blank=True)
    comments= models.CharField(max_length=200,null=True,blank=True)
    scope= models.CharField(max_length=200,null=True,blank=True)
    virtual_host= models.CharField(max_length=200,null=True,blank=True)
    note_count= models.IntegerField(null=True,blank=True)
    vuln_count= models.IntegerField(null=True,blank=True)
    service_count= models.IntegerField(null=True,blank=True)
    host_detail_count= models.IntegerField(null=True,blank=True)
    exploit_attempt_count= models.IntegerField(null=True,blank=True)
    cred_count= models.IntegerField(null=True,blank=True)
    history_count= models.CharField(max_length=200,null=True,blank=True)
    detected_arch= models.CharField(max_length=200,null=True,blank=True)
    os_family= models.CharField(max_length=200,null=True,blank=True)
    total_services_scanned = models.IntegerField(default=0)
    services_scanned = models.TextField(null=True,blank=True,verbose_name="Service Id of reports that are generated")
    total_vuln_scanned = models.IntegerField(default=0)
    vuln_scanned = models.TextField(null=True,blank=True, verbose_name="Vulnerability Id of reports that are generated")
    
    class Meta:
        ordering = ["-Host_id"]

    def __int__(self):
        return self.Host_id

class Meta_Service_Table(models.Model):
    Service_id = models.IntegerField(primary_key = True)
    host_id = models.ForeignKey(Meta_Host_Table,on_delete=models.CASCADE)
    port = models.IntegerField(null=True,blank=True)
    proto = models.CharField(max_length=200,null=True,blank=True)
    state = models.CharField(max_length=200,null=True,blank=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    info = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(null=True,blank=True)
    updated_at = models.DateTimeField(null=True,blank=True)

    class Meta:
        ordering = ["-Service_id"]

    def __int__(self):
        return self.Service_id

class Meta_Vulnerability_Table(models.Model):
    Vulnerability_id = models.IntegerField(primary_key = True)
    service_id = models.ForeignKey(Meta_Service_Table, on_delete = models.CASCADE)
    host_id = models.ForeignKey(Meta_Host_Table, on_delete = models.CASCADE)
    name = models.CharField(max_length=200,null=True,blank=True)
    info = models.TextField(null=True,blank=True)
    exploited_at = models.CharField(max_length=200,null=True,blank=True)
    vuln_detail_count = models.IntegerField(null=True,blank=True)
    vuln_attempt_count = models.IntegerField(null=True,blank=True)
    origin_id = models.IntegerField(null=True,blank=True)
    origin_type = models.CharField(max_length=200,null=True,blank=True)
    nexpose_data_vuln_def_id = models.IntegerField(null=True,blank=True)
    created_at = models.DateTimeField(null=True,blank=True)
    updated_at = models.DateTimeField(null=True,blank=True)

    class Meta:
        ordering = ["-Vulnerability_id"]

    def __int__(self):
        return self.Vulnerability_id


class Host(models.Model):
    """
    Model to store all the Hosts on which scan will be performed
    """

    ip_address = models.GenericIPAddressField(
        max_length=12, primary_key=True, unique=True
    )  # 10.10.10.10
    ip_type = models.CharField(
        max_length=30,
        choices=(("Private IP", "Private IP"), ("Public IP", "Public IP")),
    )  # internal or public
    ip_version = models.CharField(
        max_length=4,
        default="IPv4",
        choices=(("IPv4", "IPv4"), ("IPv6", "IPv6")),
        editable=False,
    )  # IPv4 or IPv6
    add_time = models.DateTimeField(
        auto_now_add=True, blank=True
    )  # Time at which IP is added

    def __str__(self) -> str:
        return "{} | {}".format(self.ip_address, self.ip_type)



class Scan(models.Model):
    """
    Model to store all the scans initiated and track their status
    """

    scan_id = models.AutoField(primary_key=True, unique=True)
    host = models.ForeignKey(Host, on_delete=models.CASCADE)
    current_status = models.CharField(
        max_length=30,
        choices=(
            ("-2", "Core Impact: Host Error"),
            ("-1", "Scan Aborted"),
            ("0", "Yet to be Scanned"),
            ("1", "NMAP WIP"),
            ("2", "Core Impact WIP"),
            ("3", "Result upload pending"),
            ("4", "Done"),
            ("5", "Metasploit WIP"),
            ("6", "Metasploit Done"),
            ("1.1", "NMAP Done"),
            ("2.1", "Core Impact Done"),
        ),
        default="0",
    )  # Core Impact WIP or NMap WIP
    scan_add_time = models.DateTimeField(
        auto_now_add=True, blank=True
    )  # Time at which IP is added
    priority = models.PositiveBigIntegerField(
        choices=((0, "Urgent"), (1, "High"), (2, "Normal"), (3, "Low")), default=2
    )  # Priority at which scans will be scheduled
    pt_start_time = models.DateTimeField(
        blank=True, null=True
    )  # Time at which PT is started
    pt_stop_time = models.DateTimeField(
        blank=True, null=True
    )  # Time at which PT is stopped
    # pt_eta_time = models.DateTimeField()  # ETA for PT to complete
    nmap_start_time = models.DateTimeField(
        blank=True, null=True
    )  # Time at which nmap is started
    nmap_stop_time = models.DateTimeField(
        blank=True, null=True
    )  # Time at which nmap is stopped
    nmap_scan_pid = models.CharField(
        max_length=128, blank=True, null=True
    )  # NMAP scan process PID
    nmap_abort_count = models.PositiveBigIntegerField(default=0)  # NMAP abort count
    core_impact_start_time = models.DateTimeField(
        blank=True, null=True
    )  # Time at which core_impact is started
    core_impact_stop_time = models.DateTimeField(
        blank=True, null=True
    )  # Time at which core_impact is stopped
    core_scan_id = models.CharField(
        max_length=128, blank=True, null=True
    )  # Core scan process PID
    core_abort_count = models.PositiveBigIntegerField(default=0)  # Core abort count
    scan_restart_count = models.PositiveBigIntegerField(default=0)  # Scan restart count
    nmap_report = models.CharField(
        max_length=128, blank=True, null=True
    )  # NMAP scan file
    core_impact_report = models.CharField(
        max_length=128, blank=True, null=True
    )  # core_impact scan file
    ptid = models.CharField(
        max_length=128, blank=True, null=True
    )  # PT id received from perspicacity
    nmap_push_time = models.DateTimeField(
        blank=True, null=True
    )  # Time at which nmap report was pushed
    core_push_time = models.DateTimeField(
        blank=True, null=True
    )  # Time at which nmap report was pushed

    meta_push_time = models.DateTimeField(
        blank=True, null=True
    ) # Time at which Meta report was pushed
    meta_add_time = models.DateTimeField( blank=True, null=True) # Time at which IP was sent to Pendig Meta Table
    meta_report =  models.CharField(max_length=256, blank=True, null=True) #Metasploit XML Reports to be stored here
    debug_info = models.TextField(max_length=1028, blank=True, null=True)
    scan_complete = models.BooleanField(default=False)

    class Meta:
        ordering = ["-scan_id"]

    def __int__(self):
        return self.scan_id


class PT_Age(models.Model):
    asset_ip=models.BigAutoField(primary_key=True)
    asset_name=models.CharField(max_length=30,null=True,blank=True)
    concatenate=models.CharField(max_length=50,null=True,blank=True)
    site_name=models.CharField(max_length=30,null=True,blank=True)
    status=models.CharField(max_length=30,null=True,blank=True)
    remarks=models.CharField(max_length=30,null=True,blank=True)
    managed_by=models.CharField(max_length=30,null=True,blank=True)
    project_name=models.CharField(max_length=30,null=True,blank=True)
    project_spoc=models.CharField(max_length=30,null=True,blank=True)
    relationship=models.CharField(max_length=30,null=True,blank=True)
    group_client=models.CharField(max_length=30,null=True,blank=True)
    iou_name=models.CharField(max_length=30,null=True,blank=True)
    bg_name=models.CharField(max_length=30,null=True,blank=True)
    asset_location=models.CharField(max_length=30,null=True,blank=True)
    asset_os_family=models.CharField(max_length=30,null=True,blank=True)
    asset_os_name=models.CharField(max_length=30,null=True,blank=True)
    asset_os_version=models.CharField(max_length=30,null=True,blank=True)
    asset_risk_score=models.IntegerField(blank=True,null=True)
    service_name=models.CharField(max_length=30,null=True,blank=True)
    service_product=models.CharField(max_length=30,null=True,blank=True)
    service_protocol=models.CharField(max_length=30,null=True,blank=True)
    vuln_title=models.CharField(max_length=30,null=True,blank=True)
    vuln_description=models.CharField(max_length=30,null=True,blank=True)
    vuln_cvss=models.IntegerField(null=True,blank=True)
    vuln_risk_score=models.IntegerField(null=True,blank=True)
    vuln_tags=models.CharField(max_length=30,null=True,blank=True)

class Totp(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    secret = models.CharField(max_length=32)