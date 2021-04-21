
<script>
import component2 from "./component2";
export default {
  name: "component1Name",
  components: {
    component2,
  },
  data() {
    return {
      a: 1,
    };
  },
  beforeCreate() {
    console.log("component 1 beforeCreated");
  },
  created() {
    console.log("component 1 created");
  },
  beforeMount() {
    console.log("component 1 beforeMount");
  },
  mounted() {
    console.log("component 1 mounted");
    setTimeout(() => {
      debugger;
      this.a++;
    }, 2000);
  },
  beforeUpdate() {
    console.log("component 1 beforeUpdate");
  },
  updated() {
    console.log("component 1 updated");
  },
  beforeDestroy() {
    console.log("component 1 beforeDestroy");
  },
  destroyed() {
    console.log("component 1 destroyed");
  },
  render() {
    return (
      <div class="this is component1">
        <div key="1">1</div>
        {this.a % 2 === 0 ? <div key="2">2</div> : null}
        <div key="3">3</div>
        {this.a % 2 === 0 ? <div key="4">4</div> : null}
        <div key="5">5</div>
      </div>
    );
  },
};
</script>