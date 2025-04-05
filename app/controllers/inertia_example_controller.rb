# frozen_string_literal: true
#app/conrollers/inertia_example_controller.rb
class InertiaExampleController < ApplicationController
  def index
    render inertia: 'InertiaExample', props: {
      name: params.fetch(:name, 'World'),
    }
  end
end
