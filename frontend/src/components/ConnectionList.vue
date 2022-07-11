<template>
    <div class="container-fluid border_box">
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>Connection Name</th>
                    <th>Status</th>
                    <th>IP Address</th>
                    <th>Subnet Mask</th>
                  </tr>
                  <tr v-for="(item, index) of connections" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.ip_address}}</td>
                    <td>{{item.subnet_mask}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <div class="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>Connection Name</th>
                    <th>Connection</th>
                    <th>Way of getting IP</th>
                  </tr>
                  <tr v-for="(item, index) of connections" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.connection}}</td>
                    <td>{{item.way_of_getting_ip}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <div class="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>Connection Name</th>
                    <th>Mode</th>
                    <th>Session Time</th>
                  </tr>
                  <tr v-for="(item, index) of connections" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.mode}}</td>
                    <td>{{item.session_time}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <div class="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>Connection Name</th>
                    <th>VLAN/Priority</th>
                    <th>MAC Address</th>
                  </tr>
                  <tr v-for="(item, index) of connections" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.vlan}}/{{item.priority}}</td>
                    <td>{{item.mac_address}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>Connection Name</th>
                    <th>Default Gateway</th>
                    <th>Primary DNS</th>
                    <th>Secondary DNS</th>
                  </tr>
                  <tr v-for="(item, index) of connections" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.default_gateway}}</td>
                    <td>{{item.primary_dns}}</td>
                    <td>{{item.secondary_dns}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    name: "ConnectionList",
    props: ["connections"]
}
</script>