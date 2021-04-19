<script>
export default {
  data() {
    return {
      j: 1,
      i: 1,
      c:[1,2]
    };
  },
  watch: {
    i: {
      handler() {
        debugger;
      },
      immediate: true,
    },
    j: {
      handler() {
        debugger;
        console.log(this.i)
      },
      immediate: true,
    },
  },
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.j++;
            this.i++;
          }}
        >
          click
        </button>
      </div>
    );
  },
};
</script>