from django.shortcuts import render
from .models import Totp,Meta_Dashboard,Nmap_Core_Dashboard,Scan,Host,Meta_Host_Table,Meta_Service_Table,Meta_Vulnerability_Table,Meta_Scan_Table
from .serializers import Meta_serializer,Nmap_serializer,Scan_Serializer,Host_Serializer,Meta_Host_Serializer,Service_Serializer,Vulnerability_Serializer,Meta_scan_Serializer,UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import HttpResponse
import json
from django.contrib.auth.models import User,Permission
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import csv
import pandas as pd
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from datetime import timedelta
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken

from django.core.paginator import Paginator
from django.core.cache import cache

from django.http import JsonResponse
from captcha.image import ImageCaptcha
from io import BytesIO
import random
import string
import pyotp
import time
 
# Generate Captcha
def generate_captcha(request):
    # selects 6 characters which are later combined together by join function...
    captcha_text = ''.join(random.choices(string.digits, k=6))
    print(captcha_text)
    cache.set('captcha_code', captcha_text, timeout=300)  # Store in cache for 5 minutes
    image = ImageCaptcha()
    data = BytesIO()
    image.write(captcha_text, data)
    # to move the file pointer back to beginning of BytesIO stream
    data.seek(0)
    return HttpResponse(data, content_type="image/png")
 



# from rest_framework.pagination import PageNumberPagination


@api_view(['GET'])
def get_chart_weekly(request):
    data = {
    "result": [
        {
            "Nmap_count": 5,
            "Core_count": 5,
            "Meta_count": 13,
            "Result_count": 2,
            "Monthly_scan": [
                1218,
                1446,
                1737,
                1028,
                1093,
                1959,
                1178,
                1888,
                2591,
                2296,
                1923
            ],
            "Week1": [
                88,
                60,
                102,
                64
            ],
            "Week2": [
                84,
                64,
                99,
                111
            ],
            "Week3": [
                181,
                170,
                203,
                165
            ],
            "Week4": [
                335,
                262,
                501,
                161
            ],
            "Week5": [
                0,
                0,
                0,
                0
            ]
        }
    ]
}
    return Response(data)
 
 
@api_view(['GET'])
def get_chart_monthly(request):
    data = {
    "result": {
        "total_count_scans": 897,
        "Nmap_WIP": 8,
        "Core_WIP": 0,
        "Meta_WIP": 0,
        "Result_Push": 2,
        "core_os_count": 897,
        "top_core_os": [
            [
                "unknown",
                823
            ],
            [
                "embedded",
                21
            ],
            [
                "windows",
                17
            ],
            [
                "linux",
                16
            ],
            [
                "ios",
                11
            ]
        ],
        "core_ports_count": 467,
        "top_core_ports": [
            [
                443,
                115
            ],
            [
                22,
                74
            ],
            [
                80,
                26
            ],
            [
                135,
                16
            ],
            [
                445,
                16
            ]
        ],
        "core_services_count": 367,
        "top_core_services": [
            [
                "https",
                115
            ],
            [
                "ssh",
                74
            ],
            [
                "http",
                28
            ],
            [
                "microsoft-ds",
                16
            ],
            [
                "loc-srv",
                16
            ]
        ],
        "core_exposures_count": 409,
        "top_core_expsoures": [
            [
                "HTTPS Active on Internet Device",
                114
            ],
            [
                "Version Disclosure on a Service",
                113
            ],
            [
                "SSH Active on Internet Device",
                73
            ],
            [
                "HTTP Active on Internet Device",
                28
            ],
            [
                "NetBIOS-DS Active on Internet Device",
                16
            ]
        ],
        "meta_os_count": 5090,
        "top_meta_os": [
            [
                "Unknown",
                634
            ],
            [
                "embedded",
                36
            ],
            [
                "Linux",
                32
            ],
            [
                "IOS",
                10
            ],
            [
                "IOS XE",
                9
            ]
        ],
        "meta_ports_count": 232,
        "top_meta_ports": [
            [
                443,
                64
            ],
            [
                80,
                21
            ],
            [
                22,
                13
            ],
            [
                500,
                12
            ],
            [
                53,
                6
            ]
        ],
        "meta_services_count": 232,
        "top_meta_services": [
            [
                "https",
                63
            ],
            [
                "snmp",
                42
            ],
            [
                "http",
                26
            ],
            [
                "ntp",
                20
            ],
            [
                "ssh",
                14
            ]
        ]
    }
}
 
    return Response(data)
 
# @permission_classes([IsAuthenticated])
# @api_view(['POST'])
# def addscantable(request):
#     if not request.user.is_superuser():
#         return Response({'error':'You dont have the permission to perform this action...'},status=status.HTTP_403_FORBIDDEN)
#     else:
#         item=Scan_Serializer(data=request.data)
#         if item.is_valid():
#             item.save()
#             return Response({},status=status.HTTP_200_OK)
#         else:
#             print(item.errors)
#             return Response({},status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['POST'])
def auth_setup(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    user_captcha = data.get('captcha')

    server_captcha = cache.get('captcha_code')
    if not server_captcha or user_captcha != server_captcha:
        return Response({"message": "Invalid captcha!"},status = status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username,password=password)
    if user:
        secret = pyotp.random_base32()
        Totp.objects.update_or_create(user=user, defaults={"secret": secret})

        # Generate otpauth:// URL
        generated_totp = pyotp.TOTP(secret)
        otp_uri = generated_totp.provisioning_uri(name=username, issuer_name="Infra Asset Risk Dashboard")

        return Response({'secret':secret,'uri':otp_uri},status=status.HTTP_200_OK)

    else:
        return Response({'message':'user not found'},status=status.HTTP_403_FORBIDDEN)

 
@api_view(["POST"])
def check_login(request):
    data = json.loads(request.body)
    username= data.get('username')
    totp= data.get('totp')
    # user_captcha = data.get('captcha')

    # server_captcha = cache.get('captcha_code')
    # if not server_captcha or user_captcha != server_captcha:
    #     return Response({"message": "Invalid captcha!"},status = status.HTTP_400_BAD_REQUEST)
 
    # user = authenticate(username=username,password=password)
    user = User.objects.get(username=username)
    print(user)
    if user:
        totp_obj = Totp.objects.get(user=user)
        new_generated_totp = pyotp.TOTP(totp_obj.secret)

        if new_generated_totp.verify(totp,valid_window=0):
            permission_list = user.get_all_permissions()
            cache.set('permission_list',permission_list,timeout=1800)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({'Token':access_token,'user':user.username},status= status.HTTP_200_OK)
    else:
        return Response({"error":"Invalid Login"},status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def validate(request):
    return Response({'message':'token is valid'},status=status.HTTP_200_OK)
 
 
@api_view(["GET"])
def send_users(request):
    if request.method=="GET":
        data=User.objects.all()
        serialized_data=UserSerializer(data,many=True)
        return Response(serialized_data.data,status=status.HTTP_200_OK)
    return Response([],status=status.HTTP_404_NOT_FOUND)
 
 
@csrf_exempt
@api_view(['POST'])
def add_user(request):
    if not request.user.is_superuser:
        print(request.user)
        return Response({'error':'You dont have the permission to perform this action...'},status=status.HTTP_403_FORBIDDEN)
    else:
        data=json.loads(request.body)
        username=data.get('username')
        permission_active_status=data.get('permission_active_status')
        permission_Staff_status=data.get('permission_Staff_status')
        model_name=data.get('model_name')
        permission_Superuser_status=data.get('permission_Superuser_status')
        password=data.get('password')
        privilege=data.get('privilege')
        if permission_Staff_status==True:
            permission_active_status=True
        if permission_Superuser_status==True:
            permission_Staff_status=True
            permission_active_status=True
        try:
            user=User.objects.get(username=username)
            if user :
                print("User already exists")
                return JsonResponse({"status":"Failed",'message':'User already exists'},status=status.HTTP_400_BAD_REQUEST)
        except:
            user=User.objects.create_user(username=username,password=password)
            user.is_staff=permission_Staff_status
            user.is_active=permission_active_status
            user.is_superuser=permission_Superuser_status
            user.save()
            c,d=[],[]
            for i in model_name:
                c.append(i.get('label').lower())
                print(c)
            for check in c:
                if check=="all of the below models":
                    c=[]
                    c.extend(['scan','host','meta_dashboard','meta_scan_table','meta_service_table','meta_vulnerability_table','nmap_core_dashboard'])
                print(c)
            for j in privilege:
                d.append(j.get('value'))
                print(d)
            for model in c:
                for k in d:
                    if k=='1':
                        print("adding all permissions................")
                        user.user_permissions.add(
                            Permission.objects.get(codename=f"view_{model}"),
                            Permission.objects.get(codename=f"add_{model}"),
                            Permission.objects.get(codename=f"change_{model}"),
                            Permission.objects.get(codename=f"delete_{model}")
                        )
                        print("Done...............................")
                    if k=='2':
                        print("adding view permissions.................")
                        user.user_permissions.add(
                            Permission.objects.get(codename=f"view_{model}")
                        )
                        print("Done...............................")
                    if k=='5':
                        print("adding add permissions.................")
                        user.user_permissions.add(
                            Permission.objects.get(codename=f'add_{model}')
                        )
                        print("Done...............................")
                    if k=='3':
                        print("adding delete permissions.................")
                        user.user_permissions.add(
                            Permission.objects.get(codename=f'delete_{model}')
                        )
                        print("Done...............................")
                    if k=='4':
                        print("adding change permissions.................")
                        user.user_permissions.add(
                            Permission.objects.get(codename=f'change_{model}')
                        )
                        print("Done...............................")
            return JsonResponse({'status':"successfull"},status=200)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def user_delete(request):
    if not request.user.is_superuser:
        return Response({'error':'You dont have the permission to perform this action...'},status=status.HTTP_403_FORBIDDEN)
    else:
        data = json.loads(request.body)
        print(data)
        c=len(data)
        d=0
        for i in data:
            d+=1
            item = User.objects.get(username=i)
            item.delete()
        if d==c:
            return Response([],status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_400_BAD_REQUEST)


def send_csv(request):
    data=Scan.objects.all()
    serialized_data=Scan_Serializer(data,many=True)
    csv_data=serialized_data.data
    count=0
    with open("new.csv",'w') as new_csv:
        csv_writer=csv.writer(new_csv)
        for i in csv_data:
            if count==0:
                csv_writer.writerow(i.keys())
                count+=1
            csv_writer.writerow(i.values())
 
 
def xlsx_to_csv():
    xlsx_file = 'your_file.xlsx'
    data = pd.read_excel(xlsx_file)
    json_data = data.to_json(orient='records')
    with open('output.json', 'w') as json_file:
        json_file.write(json_data)
   
    print("Conversion completed. JSON data saved to 'output.json'.")
 
@api_view(["GET"])
def VA_chartAPI(request):
    xlsx_file = 'VA_31_july.xlsx'
    df = pd.read_excel(xlsx_file,sheet_name="Dashboard")
    df = df.fillna(0)
    mylist = []
    for index, row in df.iterrows():
        result={}
        if(row.iloc[1] != "Public IP VA count with Aging" and row.iloc[1] != "Branches/Verticals" and row.iloc[1] != 0):
            if pd.notna(row.iloc[1]):
                result["branch"] = row.iloc[1]
                for i in range(1,18):
                    result["col"+str(i)] = row.iloc[i+1]
                result["col5_6_sum"] = row.iloc[5] + row.iloc[6]
                result["col7_8_sum"] = row.iloc[7] + row.iloc[8]
                result["col9_10_sum"] = row.iloc[9] + row.iloc[10]
                result["col11_12_sum"] = row.iloc[11] + row.iloc[12]
                mylist.append(result)            
   
    json_result = json.dumps(mylist, indent=4)
    return Response(mylist)
 
def categorize_aging(ports_dict):
    less_than_7 = 0
    days_8_to_50 = 0
    days_51_to_150 = 0
    more_than_150 = 0
    for port, age in ports_dict.items():
        if age <= 7:
            less_than_7 += 1
        elif 8 <= age <= 50:
            days_8_to_50 += 1
        elif 51 <= age <= 150:
            days_51_to_150 += 1
        else:
            more_than_150 += 1
   
    return less_than_7, days_8_to_50, days_51_to_150, more_than_150
 
 
# class FixedPageSizePagination(PageNumberPagination):
#     page_size = 20
#     page_size_query_param = None 
#     max_page_size = 20
 
def asset_summary():
    file_path = 'Analysis_Sentinel_and_VA_and_PT.xlsx'
    file_path2 ='VA_31_july.xlsx'
    pt_df = pd.read_excel(file_path, sheet_name='Perspicacity PT IPs - Public')
    sentinel_df = pd.read_excel(file_path, sheet_name='Sentinel 12th Aug IPs - Public')
 
    va_df = pd.read_excel('VA_31_july.xlsx', sheet_name='Scan Log')  # Replace with actual sheet name
   
    # Step 2: Filter rows where sentinel_present_or_not column contains 'present'
    filtered_pt_ip = pt_df[pt_df['Present in Sentinel'] == 'Present' ]
   
    # Step 3: Merge rows based on IP addresses (assuming column name 'ip_address' is common in both)
    merged_df = pd.merge(filtered_pt_ip, sentinel_df, left_on='IP Address', right_on='Sentinel IP/URL', how='inner')
 
    # Step 4: Merge the resulting merged_df with the third sheet based on 'ip_address'
    final_merged_df = pd.merge(merged_df, va_df[['Asset IP Address', 'Managed By', 'Owner']], left_on='IP Address',right_on='Asset IP Address', how='left')
    final_merged_df = final_merged_df.fillna(0)
    ip_address_list = final_merged_df['IP Address'].tolist()
    # ip_data = Get_OEA(ip_address_list)
    ip_data = {
        '125.21.49.150': [0, 3, {443: 0, 21: 6, 8080: 150, 80: 180}],
        '125.18.221.2': [2, 1, {443: 2}],
        '125.16.8.134': [1, 0, {22: 5}]
        }
   
    final_merged_df['List of open ports'] = final_merged_df['IP Address'].apply(lambda ip: ','.join(map(str,list(ip_data.get(ip, [0, 0, {}])[2].keys()))))
       
    final_merged_df['open_ports'] = final_merged_df['IP Address'].apply(lambda ip: ip_data.get(ip, [0, 0, {}])[0])
    final_merged_df['exposure'] = final_merged_df['IP Address'].apply(lambda ip: ip_data.get(ip, [0, 0, {}])[1])
   
    # Initialize new columns for port aging categories
    final_merged_df['less_than_7'] = 0
    final_merged_df['days_8_to_50'] = 0
    final_merged_df['days_51_to_150'] = 0
    final_merged_df['more_than_150'] = 0
   
    # Step 8: Apply categorization of aging values to each IP's port data
    for ip in final_merged_df['IP Address']:
        ports_dict = ip_data.get(ip, [0, 0, {}])[2]
        less_than_7, days_8_to_50, days_51_to_150, more_than_150= categorize_aging(ports_dict)
 
        final_merged_df.loc[final_merged_df['IP Address'] == ip, 'less_than_7'] = less_than_7
        final_merged_df.loc[final_merged_df['IP Address'] == ip, 'days_8_to_50'] = days_8_to_50
        final_merged_df.loc[final_merged_df['IP Address'] == ip, 'days_51_to_150'] = days_51_to_150
        final_merged_df.loc[final_merged_df['IP Address'] == ip, 'more_than_150'] = more_than_150
 
   
 
    columns_to_keep = ['IP Address', 'IP Type_x', 'Device','Branch','Geography', 'Managed By_x', 'Location', 'List of open ports', 'open_ports', 'exposure', 'less_than_7', 'days_8_to_50', 'days_51_to_150','more_than_150']
    temp_df = final_merged_df[columns_to_keep]
    temp_df = temp_df.to_dict(orient='records')
    grouped_df_location = final_merged_df.groupby('Location').agg({
    'less_than_7': 'sum',
    'days_8_to_50': 'sum',
    'days_51_to_150': 'sum',
    'more_than_150': 'sum'
    }).reset_index()
 
    # total_by_location = 0
    # total_by_location = grouped_df_location[['less_than_7', 'days_8_to_50', 'days_51_to_150', 'more_than_150']].sum().to_dict()
    # total_by_location['Location'] = 'Total Across All Locations'
 
    grouped_df_assetType = final_merged_df.groupby('Device').agg({
    'less_than_7': 'sum',
    'days_8_to_50': 'sum',
    'days_51_to_150': 'sum',
    'more_than_150': 'sum'
    }).reset_index()
 
    grouped_df_geography = final_merged_df.groupby('Geography').agg({
    'less_than_7': 'sum',
    'days_8_to_50': 'sum',
    'days_51_to_150': 'sum',
    'more_than_150': 'sum'
    }).reset_index()
 
    # Step 3: Sort by location (optional if you want sorting)
    grouped_df_location = grouped_df_location.sort_values('Location')
    # print(grouped_df_location)
    grouped_df_location = grouped_df_location.to_dict(orient='records')
    # grouped_df_location.append(total_by_location)
    # total_by_location = grouped_df_location[0,4].sum()
    # print(total_by_location)
    # grouped_df_location.to_excel('f4.xlsx', index=False)
 
    grouped_df_assetType = grouped_df_assetType.sort_values('Device')
    # print(grouped_df_assetType)
    grouped_df_assetType = grouped_df_assetType.to_dict(orient='records')
    # grouped_df_assetType.to_excel('f5.xlsx', index=False)
 
    grouped_df_geography = grouped_df_geography.sort_values('Geography')
    # print(grouped_df_geography)
    grouped_df_geography = grouped_df_geography.to_dict(orient='records')
    # grouped_df_geography.to_excel('f6.xlsx', index=False)

    combined_data = {
        "temp_df": temp_df,
        "grouped_df_location": grouped_df_location,
        "grouped_df_assetType": grouped_df_assetType,
        "grouped_df_geography": grouped_df_geography
    }
    data = temp_df,grouped_df_location,grouped_df_assetType,grouped_df_geography

    return data
    # return JsonResponse(data,safe=False)

@api_view(['GET'])
def callwithoutcp(request):
    data = asset_summary()
    return Response(data,status=200)

@api_view(['GET'])
def call(request):
    page = int(request.GET.get('page', 1))  # Default to page 1
    page_size = 100  # Fixed page size of 100 tasks per page
    cache_timeout = 15 * 60 
 
    # Generate a unique cache key for the requested page
    cache_key = f"tasks_page_{page}_size_{page_size}"
 
    # Check if the data for this page is already in the cache
    cached_page_data = cache.get(cache_key)
    if cached_page_data:
        return JsonResponse(cached_page_data)
 
    # Fetch the full dataset from the function
    data = asset_summary()
    flat_data = [item for sublist in data for item in sublist]  # Flatten the list
    tasks = flat_data
    paginator = Paginator(tasks, page_size)
 
    try:
        page_data = paginator.page(page)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
 
    # Prepare the response data for the requested page
    response_data = {
        'data': page_data.object_list,  # Paginated tasks
        'has_next': page_data.has_next(),  # Whether there are more pages
        'total': paginator.count,  # Total number of tasks
    }
 
    # Cache the page-specific data
    cache.set(cache_key, response_data, cache_timeout)
 
    return JsonResponse(response_data)
 


 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_nmap(request):
    if request.method=="GET":
        permission_list = cache.get('permission_list')
        if 'base.view_nmap_core_dashboard' in permission_list:
            print('Yes it is present...........................')
            data=Nmap_Core_Dashboard.objects.all()
            new_data=Nmap_serializer(data,many=True)
            return Response(new_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_403_FORBIDDEN)
 
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_nmap_by_id(request,id):
    if request.method=="GET":
        permission_list = cache.get('permission_list')
        if 'base.view_nmap_core_dashboard' in permission_list:
                data=Nmap_Core_Dashboard.objects.filter(Scan_id=id)
                serialized_data=Nmap_serializer(data,many=True)
                return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def add_Scan(request):
    if request.method=='POST':
        serializer=Nmap_serializer(data=request.data)
        if serializer.is_valid():
            permission_list = cache.get('permission_list')
            if 'base.add_nmap_core_dashboard' in permission_list:
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_403_FORBIDDEN)
        else:
            print(serializer.errors)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_scan(request):
    try:
        permission_list = cache.get('permission_list')
        if 'base.delete_nmap_core_dashboard' in permission_list:
            data = json.loads(request.body)
            print(data)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item =Nmap_Core_Dashboard.objects.filter(Scan_id=i)
                item[0].delete()
            if d==c:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_scan(request,id):
    try:
        item=Nmap_Core_Dashboard.objects.filter(Scan_id=id)
        serializer=Nmap_serializer(instance=item[0],data=request.data,partial=True)
        if serializer.is_valid():
            permission_list=cache.get('permission_list')
            try:
                if 'base.change_nmap_core_dashboard' in permission_list:
                    serializer.save()
                    return Response(serializer.data,status=status.HTTP_200_OK)
            except:
                return Response([],status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors,status=status.HTTP_204_NO_CONTENT)
    except:
        return Response([],status=status.HTTP_404_NOT_FOUND)
 
 
 
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_meta(request):
    if request.method=="GET":
            permission_list=cache.get('permission_list')
            if 'base.view_meta_dashboard' in permission_list:
                data=Meta_Dashboard.objects.all()
                meta_data=Meta_serializer(data,many=True)
                return Response(meta_data.data,status=status.HTTP_200_OK)
            else:    
                return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_meta_id(request,id):
    if request.method=='GET':
        permission_list=cache.get('permission_list')
        if 'base.view_meta_dashboard' in permission_list:
            item=Meta_Dashboard.objects.filter(Pending_id=id)
            serializer=Meta_serializer(item,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addMeta(request):
    item=Meta_serializer(data=request.data)
    if item.is_valid():
        permission_list = cache.get('permission_list')
        try:
            if 'base.add_meta_dashboard' in permission_list:
                item.save()
                return Response(item.data,status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    else:
        return Response(item.errors,status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_meta(request):
    try:
        permission_list = cache.get('permission_list')
        if 'base.delete_meta_dashboard' in permission_list:
            data = json.loads(request.body)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item =Meta_Dashboard.objects.filter(Pending_id=i)
                item[0].delete()
            if d==c:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response('',status=status.HTTP_403_FORBIDDEN)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_meta_id(request,id):
    item=Meta_Dashboard.objects.filter(Pending_id=id)
    data=Meta_serializer(instance=item[0],data=request.data,partial=True)
    if data.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.change_meta_dashboard' in permission_list:
                data.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    return Response({},status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_scan(request):
    if request.method=="GET":
        permission_list=cache.get('permission_list')
        if 'base.view_scan' in permission_list:
            data=Scan.objects.all()
            serialized_data=Scan_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_scan_by_id(request,id):
    permission_list = cache.get('permission_list')
    if 'base.view_scan' in permission_list:
        data=Scan.objects.filter(scan_id=id)
        serialized_data=Scan_Serializer(data,many=True)
        return Response(serialized_data.data,status=status.HTTP_200_OK)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addscantable(request):
    item=Scan_Serializer(data=request.data)
    if item.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.add_scan'in permission_list:
                item.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    else:
        print(item.errors)
        return Response({},status=status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_scan_table(request):
    try:
        permission_list=cache.get('permission_list')
        if 'base.delete_scan' in permission_list:
            data = json.loads(request.body)
            print(data)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item =Scan.objects.filter(scan_id=i)
                print(i)
                print(item)
                item[0].delete()
            if d==c and c!=0:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 
 
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_scantable_id(request,id):
    item=Scan.objects.filter(scan_id=id)
    print(item[0])
    data=Scan_Serializer(instance=item[0],data=request.data,partial=True)
    if data.is_valid():
        try:
            permission_list=cache.get('permission_list')
            if 'base.change_scan' in permission_list:
                data.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    return Response({},status=status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_host(request):
    if request.method=="GET":
        permission_list = cache.get('permission_list')
        if 'base.view_host' in permission_list:
            data=Host.objects.all()
            serialized_data=Host_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_host_by_id(request,id):
    try:
        permission_list = cache.get('permission_list')
        if 'base.view_host' in permission_list:
            data=Host.objects.filter(ip_address=id)
            print(data)
            serialized_data=Host_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
    except:
        return Response([],status=status.HTTP_404_NOT_FOUND)
 
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addhosttable(request):
    item=Host_Serializer(data=request.data)
    if item.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.add_host' in permission_list:
                item.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    else:
        print(item.errors)
        return Response({},status=status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_host_table(request):
    try:
        permission_list = cache.get('permission_list')
        if 'base.delete_host' in permission_list:
            data = json.loads(request.body)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item = Host.objects.filter(ip_address=i)
                item[0].delete()
            if d==c:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_hosttable_id(request,id):
    item=Host.objects.filter(ip_address=id)
    print(item[0])
    data=Host_Serializer(instance=item[0],data=request.data,partial=True)
    if data.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.change_host' in permission_list:
                data.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    return Response({},status=status.HTTP_400_BAD_REQUEST)
 
 
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_pending_meta(request):
    if request.method=="GET":
        permission_list=cache.get('permission_list')
        if 'base.view_meta_dashboard' in permission_list:
            print('Yes the user has the permissions.............')
            data=Meta_Dashboard.objects.all()
            meta_data=Meta_serializer(data,many=True)
            return Response(meta_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_404_NOT_FOUND)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_pendingmeta_id(request,id):
    try:
        permission_list=cache.get('permission_list')
        if 'base.view_meta_dashboard' in permission_list:
            item=Meta_Dashboard.objects.filter(Pending_id=id)
            serializer=Meta_serializer(item,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
    except:
        return Response([],status=status.HTTP_400_BAD_REQUEST)
 
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addPendingMeta(request):
    item=Meta_serializer(data=request.data)
    print(item)
    if item.is_valid():
        try:
            permission_list=cache.get('permission_list')
            if 'base.add_meta_dashboard' in permission_list:
                item.save()
                return Response(item.data,status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    else:
        print(item.errors)
        return Response(item.errors,status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_pendingmeta_table(request):
    try:
        permission_list=cache.get('permission_list')
        if 'base.delete_meta_dashboard' in permission_list:
            data = json.loads(request.body)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item = Meta_Dashboard.objects.filter(Pending_id=i)
                item[0].delete()
            if d==c:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 

@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_pendingmeta_id(request,id):
        item=Meta_Dashboard.objects.filter(Pending_id=id)
        print(item[0])
        data=Meta_serializer(instance=item[0],data=request.data,partial=True)
        if data.is_valid():
            try:
                permission_list=cache.get('permission_list')
                if 'base.change_meta_dashboard' in permission_list:
                    data.save()
                    return Response({},status=status.HTTP_200_OK)
            except:
                return Response([],status=status.HTTP_403_FORBIDDEN)
        return Response({},status=status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_meta_scan(request):
    if request.method=="GET":
        permission_list=cache.get('permission_list')
        if 'base.view_meta_scan_table' in permission_list:
            data = Meta_Scan_Table.objects.all()
            serialized_data = Meta_scan_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_404_NOT_FOUND)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_metascan_by_id(request,id):
    try:
        permission_list=cache.get('permission_list')
        if 'base.view_meta_scan_table' in permission_list:
            data=Meta_Scan_Table.objects.filter(Scan_id=id)
            serialized_data=Meta_scan_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
    except:
        return Response([],status=status.HTTP_404_NOT_FOUND)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addMeta_Scan(request):
    item=Meta_scan_Serializer(data=request.data)
    if item.is_valid():
        try:
            permission_list=cache.get('permission_list')
            if 'base.add_meta_scan_table' in permission_list:
                item.save()
                return Response(item.data,status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    else:
        print(item.errors)
        return Response(item.errors,status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_metascan_table(request):
    try:
        permission_list=cache.get('permission_list')
        if 'base.delete_meta_scan_table' in permission_list:
            data = json.loads(request.body)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item = Meta_Scan_Table.objects.filter(Scan_id=i)
                item[0].delete()
            if d==c:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_metascantable_id(request,id):
    item=Meta_Scan_Table.objects.filter(Scan_id=id)
    print(item[0])
    data=Meta_scan_Serializer(instance=item[0],data=request.data,partial=True)
    if data.is_valid():
        try:
            permission_list=cache.get('permission_list')
            if 'base.change_meta_scan_table' in permission_list:
                data.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    return Response({},status=status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_meta_host(request):
    if request.method=="GET":
        permission_list = cache.get('permission_list')
        if 'base.view_meta_host_table' in permission_list:
            data=Meta_Host_Table.objects.all()
            serialized_data=Meta_Host_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_metahost_by_id(request,id):
    try:
        permission_list = cache.get('permission_list')
        if 'base.view_meta_host_table' in permission_list:
            data=Meta_Host_Table.objects.filter(Host_id=id)
            serialized_data=Meta_Host_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
    except:
        return Response([],status=status.HTTP_404_NOT_FOUND)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addMeta_Host(request):
    data1 = json.loads(request.body)
    print(data1)
    item=Meta_Host_Serializer(data=request.data)
    print(item)
    if item.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.add_meta_host_table' in permission_list:
                item.save()
                return Response(item.data,status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)

    else:
        print(item.errors)
        return Response(item.errors,status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_metashost_table(request):
    try:
        permission_list = cache.get('permission_list')
        if 'base.delete_meta_host_table' in permission_list:
            data = json.loads(request.body)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item = Meta_Host_Table.objects.filter(Host_id=i)
                item[0].delete()
            if d==c:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_metahosttable_id(request,id):
    item=Meta_Host_Table.objects.filter(Host_id=id)
    print(item[0])
    data=Meta_Host_Serializer(instance=item[0],data=request.data,partial=True)
    if data.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.change_meta_host_table' in permission_list:
                data.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response({},status=status.HTTP_403_FORBIDDEN)
    return Response({},status=status.HTTP_400_BAD_REQUEST)


 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_meta_service(request):
    if request.method=="GET":
        permission_list = cache.get('permission_list')
        if 'base.view_meta_service_table' in permission_list:
            data=Meta_Service_Table.objects.all()
            serialized_data=Service_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_404_NOT_FOUND)
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_metaservice_by_id(request,id):
    try:
        permission_list = cache.get('permission_list')
        if 'base.view_meta_service_table' in permission_list:
            data=Meta_Service_Table.objects.filter(Service_id=id)
            serialized_data=Service_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
    except:
        return Response([],status=status.HTTP_404_NOT_FOUND)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addMeta_Service(request):
    item=Service_Serializer(data=request.data)
    print(item)
    if item.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.view_meta_service_table' in permission_list:
                item.save()
                return Response(item.data,status=status.HTTP_200_OK)
        except:
            return Response([],status=status.HTTP_403_FORBIDDEN)
    else:
        print(item.errors)
        return Response(item.errors,status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_metaservice_table(request):
    try:
        permission_list = cache.get('permission_list')
        if 'base.delete_meta_service_table' in permission_list:
            data = json.loads(request.body)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item = Meta_Service_Table.objects.filter(Service_id=i)
                item[0].delete()
            if d==c:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def update_metaservicetable_id(request,id):
    item=Meta_Service_Table.objects.filter(Service_id=id)
    print(item[0])
    data=Service_Serializer(instance=item[0],data=request.data,partial=True)
    if data.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.change_meta_service_table' in permission_list:
                data.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response({},status=status.HTTP_403_FORBIDDEN)
    return Response({},status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_meta_vulnerability(request):
    if request.method=="GET":
        permission_list = cache.get('permission_list')
        if 'base.view_meta_vulnerability_table' in permission_list:
            data=Meta_Vulnerability_Table.objects.all()
            serialized_data=Vulnerability_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response([],status=status.HTTP_403_FORBIDDEN)
 
 
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_metavulnerability_by_id(request,id):
    try:
        permission_list = cache.get('permission_list')
        if 'base.view_meta_vulnerability_table' in permission_list:
            data=Meta_Vulnerability_Table.objects.filter(Vulnerability_id=id)
            serialized_data=Vulnerability_Serializer(data,many=True)
            return Response(serialized_data.data,status=status.HTTP_200_OK)
    except:
        return Response([],status=status.HTTP_404_NOT_FOUND)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addMeta_Vulterability(request):
        item=Vulnerability_Serializer(data=request.data)
        print(item)
        if item.is_valid():
            try:
                permission_list = cache.get('permission_list')
                if 'base.add_meta_vulnerability_table' in permission_list:
                    item.save()
                    return Response(item.data,status=status.HTTP_200_OK)
            except:
                return Response([],status=status.HTTP_403_FORBIDDEN)
        else:
            print(item.errors)
            return Response(item.errors,status.HTTP_400_BAD_REQUEST)
 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_multiple_metavulnerability_table(request):
    try:
        permission_list = cache.get('permission_list')
        if 'base.delete_meta_vulnerability_table' in permission_list:
            data = json.loads(request.body)
            c=len(data)
            d=0
            for i in data:
                d+=1
                item = Meta_Vulnerability_Table.objects.filter(Vulnerability_id=i)
                item[0].delete()
            if d==c:
                return Response([],status=status.HTTP_200_OK)
            else:
                return Response([],status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response([],status=status.HTTP_403_FORBIDDEN)
 
@api_view(['PUT'])
def update_metavulenrabilitytable_id(request,id):
    item=Meta_Vulnerability_Table.objects.filter(Vulnerability_id=id)
    print(item[0])
    data=Vulnerability_Serializer(instance=item[0],data=request.data,partial=True)
    if data.is_valid():
        try:
            permission_list = cache.get('permission_list')
            if 'base.change_meta_vulnerability_table' in permission_list:
                data.save()
                return Response({},status=status.HTTP_200_OK)
        except:
            return Response({},status=status.HTTP_403_FORBIDDEN)
    return Response({},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def logout(request):
    cache.clear()
    return Response({},status=status.HTTP_200_OK)




 
 
 
 
 
 
 
 
 