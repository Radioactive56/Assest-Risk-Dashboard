from django.contrib import admin
from base.models import Host,Scan,Totp,Meta_Dashboard,Nmap_Core_Dashboard,Meta_Host_Table,Meta_Scan_Table,Meta_Service_Table,Meta_Vulnerability_Table
# Register your models here.

admin.site.register(Meta_Dashboard)
admin.site.register(Nmap_Core_Dashboard)
admin.site.register(Meta_Scan_Table)
admin.site.register(Meta_Host_Table)
admin.site.register(Meta_Service_Table)
admin.site.register(Meta_Vulnerability_Table)
admin.site.register(Scan)
admin.site.register(Host)

class TotpAdmin(admin.ModelAdmin):
    list_display=['user','secret']

    search_field=['user']

admin.site.register(Totp,TotpAdmin)