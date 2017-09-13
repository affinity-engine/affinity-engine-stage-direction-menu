export default {
  priority: 3,
  default: {
    component: {
      stage: {
        direction: {
          menu: {
            attrs: {
              layer: 'stage.prompt.menu'
            }
          }
        },
        layer: {
          stage: {
            prompt: {
              attrs: {
                zIndex: 10
              },
              menu: {
                attrs: {
                  zIndex: 10
                }
              }
            }
          }
        }
      }
    }
  }
};
